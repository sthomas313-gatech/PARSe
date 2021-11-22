import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'

export const checkRecLikesDocExists = async (recID) => {
    try {
        const docRef = await firebase.firestore()
            .collection("recLikes")
            .doc(recID)
            .get();
        console.log(`checkRecLikesDocExists resolving to ${docRef.exists}`);
        return docRef.exists;
    } catch (error) {
        console.log(`error checking if rec ${recID} has a doc in 'recLikes' collection already; error: ${error}`);
        return null;
    }
};