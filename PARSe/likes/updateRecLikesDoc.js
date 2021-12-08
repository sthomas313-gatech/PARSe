import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentTimestamp } from '../time';

export const updateRecLikesDoc = async (docID, recLikesUpdate) => {
    firebase.firestore()
        .collection("recLikes")
        .doc(docID)
        .update({...recLikesUpdate, updated: getCurrentTimestamp()});
};