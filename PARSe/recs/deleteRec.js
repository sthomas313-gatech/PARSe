import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentTimestamp } from '../time';


export const deleteRec = async (recID, userID) => {
    try {
        firebase.firestore()
            .collection("recs")
            .doc(recID)
            .delete();
        
        var updates = {}
        updates[recID] = false;

        firebase.firestore()
            .collection("userRecs")
            .doc(userID)
            .update({...updates, updated: getCurrentTimestamp()});
        
    } catch (error) {
        throw new Error(error);
    }
}