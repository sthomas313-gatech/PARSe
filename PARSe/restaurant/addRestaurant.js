import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'

export const addRestaurant = async (restaurant) => {
    try {
        const createdRestaurantDoc = await firebase.firestore()
            .collection("restaurants")
            .add(restaurant);
        
        if (!createdRestaurantDoc) {
            console.log(`issue writing new restaurant to firestore 'restaurants' collection`);
            return null;
        }
    
        return createdRestaurantDoc;

    } catch (error) {
        throw new Error(`error in addRestaurant function: ${error}`);
    }
};
