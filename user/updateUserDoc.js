import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentTimestamp } from '../time';

export const updateUserDoc = async (userID, updates) => {
    await firebase.firestore()
        .collection("users")
        .doc(userID)
        .update({...updates, updated: getCurrentTimestamp()});
};