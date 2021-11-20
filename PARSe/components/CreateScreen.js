import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  View,
  LogBox,
  Button
} from 'react-native';
// import { Button } from 'react-native-paper';
import Header from './Header';
import NavBar from './NavBar';
import { addCurrentUserRec } from '../recs/addCurrentUserRec';
import { searchRestaurant } from '../restaurant';


// import {launchImageLibrary} from 'react-native-image-picker';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
// import DropDownPicker from 'react-native-dropdown-picker';


// firestore
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';


const TAG_OPTIONS = [
    {item: "Cheap", id: "Cheap"},
    {item: "Fancy", id: "Fancy"},

    {item: "Bike-safe", id: "Bike-safe"},

    {item: "Fast", id: "Fast"},

    {item: "Italian", id: "Italian"},
    {item: "BBQ", id: "BBQ"},
    {item: "American", id: "American"},
    {item: "Pizza", id: "Pizza"},
    {item: "Chinese", id: "Chinese"},
    {item: "Japanese", id: "Japanese"},
    {item: "Ramen", id: "Ramen"},
    {item: "Sushi", id: "Sushi"},
    {item: "Indian", id: "Indian"},
]





export default function CreateScreen( {navigation} ) {

    const [title, setTitle] = React.useState("");
    const [restaurant, setRestaurant] = React.useState("");
    const [comments, setComments] = React.useState("");
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    // const [tags, setTags] = React.useState(TAG_OPTIONS);
    // const [tagSelectorOpen, setTagSelectorOpen] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState(null);

    const buttonSubmit = async () => {
        const newRec = {};
        newRec["title"] = title;
        newRec["restaurantName"] = restaurant;
        newRec["comments"] = comments;
        newRec["tags"] = {}
        selectedTags.forEach(tag => {
            newRec["tags"][tag.item] = true;
        });

        const newRestaurant = {};
        newRestaurant["name"] = restaurant;
        newRestaurant["location"] = {};
        newRestaurant["location"]["city"] = city;
        newRestaurant["location"]["state"] = state;
        
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

    // React.useEffect(() => { 
    //     const obj = {name: "Taqueria Del Sol", city: "Atlanta"};
    //     searchRestaurant(obj)
    //         .then((results) => {
    //             console.log(`searchRestaurant results: ${JSON.stringify(results)}`);
    //             // console.log()
    //         })
    //         .catch((error) => {
    //             console.log(`error in searchRestaurant: ${error}`);
    //         });
    // }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header text={"Create Recommendation"} createButton={false}  />
            <View style={styles.scrollViewStyle} >
                {/* <Text style={styles.textStyle}>Create Recommendation:</Text> */}
                <Text style={styles.textStyle}>Recommendation Title:</Text>
                <TextInput 
                    style={styles.inputBox}
                    autoCapitalize="none" 
                    onChangeText={title => setTitle(title)}
                    placeholder="Awesome Dinner!!" 
                />
                <Text style={styles.textStyle}>Restaurant:</Text>
                <TextInput 
                    style={styles.inputBox}
                    autoCapitalize="none" 
                    onChangeText={rest => setRestaurant(rest)}
                    placeholder="" 
                />
                <Text style={styles.textStyle}>City:</Text>
                <TextInput 
                    style={styles.inputBox}
                    autoCapitalize="none" 
                    onChangeText={city => setCity(city)}
                    placeholder="" 
                />
                <Text style={styles.textStyle}>State:</Text>
                <TextInput 
                    style={styles.inputBox}
                    autoCapitalize="none" 
                    onChangeText={state => setState(state)}
                    placeholder="" 
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
                <Button title="Submit" onPress={buttonSubmit}>
                </Button>


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
        margin: 18
    }
});
