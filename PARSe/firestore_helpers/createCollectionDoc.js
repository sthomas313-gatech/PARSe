
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentTimestamp } from '../time';

export const createCollectionDoc = async (collection, docID, docUpdate) => {
    firebase.firestore()
        .collection(collection)
        .doc(docID)
        .set({...docUpdate, created: getCurrentTimestamp()});
}