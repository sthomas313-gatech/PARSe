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


// import {launchImageLibrary} from 'react-native-image-picker';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
// import DropDownPicker from 'react-native-dropdown-picker';


// firestore
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import RNGooglePlaces from 'react-native-google-places-api';



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
    {item: "Afghan", id: "Afghan"},
    {item: "African", id: "African"},
    {item: "Albanian", id: "Albanian"},
    {item: "American", id: "American"},
    {item: "Arabian", id: "Arabian"},
    {item: "Argentinian", id: "Argentinian"},
    {item: "Armenian", id: "Armenian"},
    {item: "Asian Fusion", id: "Asian Fusion"},
    {item: "Australian", id: "Australian"},
    {item: "Austrian", id: "Austrian"},
    {item: "Bagels", id: "Bagels"},
    {item: "Bakery", id: "Bakery"},
    {item: "Barbeque", id: "Barbeque"},
    {item: "Belgian", id: "Belgian"},
    {item: "Brasseries", id: "Brasseries"},
    {item: "Brazilian", id: "Brazilian"},
    {item: "Breakfast", id: "Breakfast"},
    {item: "British", id: "British"},
    {item: "Brunch", id: "Brunch"},
    {item: "Buffets", id: "Buffets"},
    {item: "Burgers", id: "Burgers"},
    {item: "Burmese", id: "Burmese"},
    {item: "Cafes", id: "Cafes"},
    {item: "Cafeteria", id: "Cafeteria"},
    {item: "Cajun", id: "Cajun"},
    {item: "Californian", id: "Californian"},
    {item: "Calzones", id: "Calzones"},
    {item: "Cambodian", id: "Cambodian"},
    {item: "Cantonese", id: "Cantonese"},
    {item: "Caribbean", id: "Caribbean"},
    {item: "Catalan", id: "Catalan"},
    {item: "Cheesesteaks", id: "Cheesesteaks"},
    {item: "Chicken", id: "Chicken"},
    {item: "Chicken Wings", id: "Chicken Wings"},
    {item: "Chili", id: "Chili"},
    {item: "Chinese", id: "Chinese"},
    {item: "Classic", id: "Classic"},
    {item: "Coffee and Tea", id: "Coffee and Tea"},
    {item: "Colombian", id: "Colombian"},
    {item: "Comfort Food", id: "Comfort Food"},
    {item: "Costa Rican", id: "Costa Rican"},
    {item: "Creole", id: "Creole"},
    {item: "Crepes", id: "Crepes"},
    {item: "Cuban", id: "Cuban"},
    {item: "Czech", id: "Czech"},
    {item: "Delis", id: "Delis"},
    {item: "Dessert", id: "Dessert"},
    {item: "Dim Sum", id: "Dim Sum"},
    {item: "Diner", id: "Diner"},
    {item: "Dominican", id: "Dominican"},
    {item: "Eclectic", id: "Eclectic"},
    {item: "Ecuadorian", id: "Ecuadorian"},
    {item: "Egyptian", id: "Egyptian"},
    {item: "El Salvadoran", id: "El Salvadoran"},
    {item: "Empanadas", id: "Empanadas"},
    {item: "English", id: "English"},
    {item: "Ethiopian", id: "Ethiopian"},
    {item: "Fast Food", id: "Fast Food"},
    {item: "Filipino", id: "Filipino"},
    {item: "Fine Dining", id: "Fine Dining"},
    {item: "Fish & Chips", id: "Fish & Chips"},
    {item: "Fondue", id: "Fondue"},
    {item: "Food Cart", id: "Food Cart"},
    {item: "Food Court", id: "Food Court"},
    {item: "Food Stands", id: "Food Stands"},
    {item: "French", id: "French"},
    {item: "Fresh Fruits", id: "Fresh Fruits"},
    {item: "Frozen Yogurt", id: "Frozen Yogurt"},
    {item: "Gastropubs", id: "Gastropubs"},
    {item: "German", id: "German"},
    {item: "Gluten-Free", id: "Gluten-Free"},
    {item: "Greek", id: "Greek"},
    {item: "Grill", id: "Grill"},
    {item: "Guatemalan", id: "Guatemalan"},
    {item: "Gyro", id: "Gyro"},
    {item: "Haitian", id: "Haitian"},
    {item: "Halal", id: "Halal"},
    {item: "Hawaiian", id: "Hawaiian"},
    {item: "Himalayan", id: "Himalayan"},
    {item: "Hoagies", id: "Hoagies"},
    {item: "Hot Dogs", id: "Hot Dogs"},
    {item: "Hot Pot", id: "Hot Pot"},
    {item: "Hungarian", id: "Hungarian"},
    {item: "Iberian", id: "Iberian"},
    {item: "Ice Cream", id: "Ice Cream"},
    {item: "Indian", id: "Indian"},
    {item: "Indonesian", id: "Indonesian"},
    {item: "Irish", id: "Irish"},
    {item: "Italian", id: "Italian"},
    {item: "Jamaican", id: "Jamaican"},
    {item: "Japanese", id: "Japanese"},
    {item: "Kids", id: "Kids"},
    {item: "Korean", id: "Korean"},
    {item: "Kosher", id: "Kosher"},
    {item: "Laotian", id: "Laotian"},
    {item: "Late Night", id: "Late Night"},
    {item: "Latin American", id: "Latin American"},
    {item: "Lebanese", id: "Lebanese"},
    {item: "Live/Raw Food", id: "Live/Raw Food"},
    {item: "Low Carb", id: "Low Carb"},
    {item: "Malaysian", id: "Malaysian"},
    {item: "Mandarin", id: "Mandarin"},
    {item: "Mediterranean", id: "Mediterranean"},
    {item: "Mexican", id: "Mexican"},
    {item: "Middle Eastern", id: "Middle Eastern"},
    {item: "Modern European", id: "Modern European"},
    {item: "Mongolian", id: "Mongolian"},
    {item: "Moroccan", id: "Moroccan"},
    {item: "Nepalese", id: "Nepalese"},
    {item: "Noodles", id: "Noodles"},
    {item: "Nouvelle cuisine", id: "Nouvelle cuisine"},
    {item: "Nutritious", id: "Nutritious"},
    {item: "Organic", id: "Organic"},
    {item: "Pakistani", id: "Pakistani"},
    {item: "Pancakes", id: "Pancakes"},
    {item: "Pasta", id: "Pasta"},
    {item: "Persian", id: "Persian"},
    {item: "Persian/Iranian", id: "Persian/Iranian"},
    {item: "Peruvian", id: "Peruvian"},
    {item: "Pitas", id: "Pitas"},
    {item: "Pizza", id: "Pizza"},
    {item: "Polish", id: "Polish"},
    {item: "Portuguese", id: "Portuguese"},
    {item: "Potato", id: "Potato"},
    {item: "Poutineries", id: "Poutineries"},
    {item: "Pub Food", id: "Pub Food"},
    {item: "Puerto Rican", id: "Puerto Rican"},
    {item: "Ribs", id: "Ribs"},
    {item: "Russian", id: "Russian"},
    {item: "Salad", id: "Salad"},
    {item: "Sandwiches", id: "Sandwiches"},
    {item: "Scandinavian", id: "Scandinavian"},
    {item: "Scottish", id: "Scottish"},
    {item: "Seafood", id: "Seafood"},
    {item: "Senegalese", id: "Senegalese"},
    {item: "Singaporean", id: "Singaporean"},
    {item: "Slovakian", id: "Slovakian"},
    {item: "Small Plates", id: "Small Plates"},
    {item: "Smoothies and Juices", id: "Smoothies and Juices"},
    {item: "Soul Food", id: "Soul Food"},
    {item: "Soup", id: "Soup"},
    {item: "South African", id: "South African"},
    {item: "South American", id: "South American"},
    {item: "Southern", id: "Southern"},
    {item: "Southwestern", id: "Southwestern"},
    {item: "Spanish", id: "Spanish"},
    {item: "Sri Lankan", id: "Sri Lankan"},
    {item: "Steakhouses", id: "Steakhouses"},
    {item: "Subs", id: "Subs"},
    {item: "Supper Clubs", id: "Supper Clubs"},
    {item: "Sushi Bars", id: "Sushi Bars"},
    {item: "Syrian", id: "Syrian"},
    {item: "Szechwan", id: "Szechwan"},
    {item: "Taiwanese", id: "Taiwanese"},
    {item: "Tapas", id: "Tapas"},
    {item: "Tex-Mex", id: "Tex-Mex"},
    {item: "Thai", id: "Thai"},
    {item: "Tibetan", id: "Tibetan"},
    {item: "Turkish", id: "Turkish"},
    {item: "Ukrainian", id: "Ukrainian"},
    {item: "Uzbek", id: "Uzbek"},
    {item: "Vegan", id: "Vegan"},
    {item: "Vegetarian", id: "Vegetarian"},
    {item: "Vietnamese", id: "Vietnamese"},
    {item: "Wraps", id: "Wraps"}

]





export default function CreateScreen( {navigation} ) {

    const [title, setTitle] = React.useState(null);
    const [restaurant, setRestaurant] = React.useState(null);
    const [comments, setComments] = React.useState(null);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [city, setCity] = React.useState(null);
    const [state, setState] = React.useState(null);
    const [street1, setStreet1] = React.useState(null);
    const [zipcode, setZipcode] = React.useState(null);
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
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                if (place && "address" in place) {
                    const split1 = place.address.split(",");
                    const tempCity = split1[1].trim();
                    const tempStreet1 = split1[0].trim();
                    const split2 = split1[2].trim().split(" ");
                    const tempState = split2[0].trim();
                    const tempZipcode = split2[1].trim();
                    setCity(tempCity);
                    setState(tempState);
                    setStreet1(tempStreet1);
                    setZipcode(tempZipcode);
                }
                if (place && "name" in place) {
                    setRestaurant(place.name);
                }
                if (place && "location" in place) {
                    setCoordinate(place.location);
                }
                // place.
                console.log(JSON.stringify(place, undefined, 2));
                // place represents user's selection from the
                // suggestions and it is a simplified Google Place object.
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object
    };

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
        margin: 18,
        marginTop: 0
    }
});
