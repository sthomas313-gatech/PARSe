import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'

export const checkCollectionDocExists = async (collection, docID) => {
    try {
        const docRef = await firebase.firestore()
            .collection(collection)
            .doc(docID)
            .get();
        return docRef.exists;
    } catch (error) {
        console.log(`error checking if doc '${docID}' exists in collection '${collection}' already; error: ${error}`);
        return null;
    }
};