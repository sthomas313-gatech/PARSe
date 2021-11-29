import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'



export const getCollectionDoc = async (collection, docID) => {

    return firebase.firestore()
        .collection(collection)
        .doc(docID)
        .get();

}