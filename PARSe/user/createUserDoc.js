import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentTimestamp } from '../time';

export const createUserDoc = async (userID, updates) => {
    await firebase.firestore()
        .collection("users")
        .doc(userID)
        .set({...updates, created: getCurrentTimestamp()});
};