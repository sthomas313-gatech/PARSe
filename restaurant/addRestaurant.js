import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentTimestamp } from '../time';

export const addRestaurant = async (restaurant) => {
    try {

        console.log("addRestaurant: ");
        console.log(restaurant);
        
        const createdRestaurantDoc = await firebase.firestore()
            .collection("restaurants")
            .add(
                {...restaurant, 
                    created: getCurrentTimestamp()
                });
        
        if (!createdRestaurantDoc) {
            console.log(`issue writing new restaurant to firestore 'restaurants' collection`);
            return null;
        }
    
        return createdRestaurantDoc;

    } catch (error) {
        throw new Error(`error in addRestaurant function: ${error}`);
    }
};
