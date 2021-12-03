import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'


export const searchRestaurant = async (restaurant) => {

    var searchName = null;
    var searchCity = null;
    var searchState = null;

    if ("name" in restaurant) {
        searchName = restaurant.name;
    } else {
        console.log(`searchRestaurant function, no name provided in parameter ${JSON.stringify(restaurant)}`);
        return null;
    }

    if ("location" in restaurant) {
        if ("city" in restaurant.location) {
            searchCity = restaurant.location.city;
        }
        if ("state" in restaurant.location) {
            searchState = restaurant.location.state;
        }
    }

    const restaurantsRef = firebase.firestore().collection("restaurants");

    var querySnapshot = null;
    if (searchName && !searchCity && !searchState) {
        querySnapshot = await restaurantsRef
            .where("name", "==", searchName)
            .get();
    } else if (searchName && searchCity && !searchState) {
        querySnapshot = await restaurantsRef
            .where("name", "==", searchName)
            .where("location.city", "==", searchCity)
            .get();
    } else if (searchName && !searchCity && searchState) {
        querySnapshot = await restaurantsRef
            .where("name", "==", searchName)
            .where("location.state", "==", searchState)
            .get();
    } else if (searchName && searchCity && searchState) {
        querySnapshot = await restaurantsRef
            .where("name", "==", searchName)
            .where("location.city", "==", searchCity)
            .where("location.state", "==", searchState)
            .get();
    };

    if (!querySnapshot) return null;

    const restaurants = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));

    return restaurants;

};