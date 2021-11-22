
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentTimestamp } from '../time';

export const createRecLikesDoc = async (docID, recLikesUpdate) => {
    firebase.firestore()
        .collection("recLikes")
        .doc(docID)
        .set({...recLikesUpdate, created: getCurrentTimestamp()});
}