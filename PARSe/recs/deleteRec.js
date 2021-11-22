import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentTimestamp } from '../time';
import { checkRestaurantRecDependency } from '../restaurant';


export const deleteRec = async (recID, userID, restaurantID) => {
    try {
        firebase.firestore()
            .collection("recs")
            .doc(recID)
            .delete().then(() => {
                checkRestaurantRecDependency(restaurantID);
            });
        
        var updates = {};
        updates[recID] = false;

        firebase.firestore()
            .collection("userRecs")
            .doc(userID)
            .update({...updates, updated: getCurrentTimestamp()});
        
    } catch (error) {
        throw new Error(error);
    }
}