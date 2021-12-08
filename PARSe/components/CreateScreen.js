import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  View,
  LogBox,
  Button,
  TouchableOpacity
} from 'react-native';
// import { Button } from 'react-native-paper';
import Header from './Header';
import NavBar from './NavBar';
import { addCurrentUserRec } from '../recs/addCurrentUserRec';
import { searchRestaurant } from '../restaurant';
import { TAG_OPTIONS } from '../recs';


// import {launchImageLibrary} from 'react-native-image-picker';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
// import DropDownPicker from 'react-native-dropdown-picker';


// firestore
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

// Google Place API
import RNGooglePlaces from 'react-native-google-places-api';


export default function CreateScreen( {navigation} ) {

    const [title, setTitle] = React.useState(null);
    const [restaurant, setRestaurant] = React.useState(null);
    const [comments, setComments] = React.useState(null);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [city, setCity] = React.useState(null);
    const [state, setState] = React.useState(null);
    const [street1, setStreet1] = React.useState(null);
    const [zipcode, setZipcode] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [coordinate, setCoordinate] = React.useState(null);

    const [errorMessage, setErrorMessage] = React.useState(null);

    const buttonSubmit = async () => {
        const newRec = {};
        newRec.title = title;
        newRec.restaurantName = restaurant;
        newRec.comments = comments;
        newRec.tags = {}
        selectedTags.forEach(tag => {
            newRec.tags[tag.item] = true;
        });

        const newRestaurant = {};
        newRestaurant.name = restaurant;
        newRestaurant.location = {};
        newRestaurant.location.city = city;
        newRestaurant.location.state = state;
        newRestaurant.location.street1 = street1;
        newRestaurant.location.zipcode = zipcode;
        newRestaurant.location.coordinate = coordinate;
        newRestaurant.location.address = address;
        
        await addCurrentUserRec(newRec, newRestaurant);
        navigation.navigate("FeedScreen");
    };


    React.useEffect(() => { 
        var selectedTagsList = [];
        for (var i=0; i < selectedTags.length; i++) {
            selectedTagsList.push(selectedTags[i].item);
        }
        console.log(`selected tags: ${selectedTagsList}`); 
    }, [selectedTags]);
    

    const openSearchModal = () => {
        // open Google Places Modal
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                // print selected place (restaurant) to log
                console.log(JSON.stringify(place, undefined, 2));

                // parse out available address components, save to component state
                if (place && "addressComponents" in place) {
                    var tempStreetNumber = "";
                    var tempRoute = "";
                    place.addressComponents.forEach((addressComp) => {
                        addressComp.types.forEach((type) => {
                            if (type == "street_number") {
                                tempStreetNumber = addressComp.shortName;
                            } else if (type == "route") {
                                tempRoute = addressComp.shortName;
                            } else if (type == "locality") {
                                setCity(addressComp.shortName);
                            } else if (type == "administrative_area_level_1") {
                                setState(addressComp.shortName);
                            } else if (type == "postal_code") {
                                setZipcode(addressComp.shortName);
                            }
                        });
                    });
                    setStreet1(`${tempStreetNumber} ${tempRoute}`);
                }

                // save selected restaurant's full address (if available) to component state
                if (place && "address" in place) {
                    setAddress(place.address);
                }
                // save selected restaurant's name to component state
                if (place && "name" in place) {
                    setRestaurant(place.name);
                }

                // save GPS location (if available) of selected restaurant to component state
                if (place && "location" in place) {
                    setCoordinate(place.location);
                }
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header text={"Add"} topLeftElement={<Button title="Cancel" onPress={() => navigation.goBack()} />} />
            <View style={styles.scrollViewStyle} >
                {/* <Text style={styles.textStyle}>Create Recommendation:</Text> */}
                <Button
                    title="Click to Search for a Restaurant"
                    onPress={() => openSearchModal()}
                >
                </Button>
                <Text style={styles.textStyle}>Restaurant:</Text>
                <TextInput 
                    style={styles.inputBox}
                    autoCapitalize="none" 
                    onChangeText={rest => setRestaurant(rest)}
                    placeholder="" 
                    value={restaurant}
                />
                <Text style={styles.textStyle}>City:</Text>
                <TextInput 
                    style={styles.inputBox}
                    autoCapitalize="none" 
                    onChangeText={city => setCity(city)}
                    placeholder="" 
                    value={city}
                />
                <Text style={styles.textStyle}>State:</Text>
                <TextInput 
                    style={styles.inputBox}
                    autoCapitalize="none" 
                    onChangeText={state => setState(state)}
                    placeholder="" 
                    value={state}
                />
                <Text style={styles.textStyle}>Recommendation Title:</Text>
                <TextInput 
                    style={styles.inputBox}
                    autoCapitalize="none" 
                    onChangeText={title => setTitle(title)}
                    placeholder="Awesome Dinner!!" 
                />
                <Text style={styles.textStyle}>Comments:</Text>
                <TextInput 
                    style={styles.commentsInputBox}
                    multiline={true}
                    numberOfLines={3}
                    autoCapitalize="none" 
                    onChangeText={comments => setComments(comments)}
                    placeholder="" 
                />
                <Text style={styles.textStyle}>Tags:</Text>
                <View>
                    <SelectBox
                        label={null}
                        options={TAG_OPTIONS}
                        selectedValues={selectedTags}
                        onMultiSelect={onMultiChange()}
                        onTapClose={onMultiChange()}
                        isMulti
                    />
                </View>
                <View style={styles.bottomButtons}> 
                    <Button title="Submit" onPress={buttonSubmit} />
                    {/* <Button title="Next" onPress={() => console.log("TODO: not functional yet!")} /> */}
                </View>
                


            </View>
            
            {/* <NavBar navigation={navigation} ></NavBar> */}
        </SafeAreaView>
    );

    function onMultiChange() {
        return (item) => setSelectedTags(xorBy(selectedTags, [item], 'id'))
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    textStyle: {
        fontFamily: "Helvetica",
    },
    inputBox: {
        height: 40,
        marginBottom: 12,
        marginTop: 2,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgb(250,250,250)"
    },
    commentsInputBox: {
        height: 80,
        marginBottom: 12,
        marginTop: 2,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgb(250,250,250)"
    },
    scrollViewStyle: {
        // justifyContent: "center",
        flex: 1,
        padding: 10,
        margin: 18,
        marginTop: 0
    },
    bottomButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    }
});
