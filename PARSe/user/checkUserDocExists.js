import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'

export const checkUserDocExists = async (userID) => {
    try {
        const docRef = await firebase.firestore()
            .collection("users")
            .doc(userID)
            .get();
        // console.log(`checkRecLikesDocExists resolving to ${docRef.exists}`);
        return docRef.exists;
    } catch (error) {
        console.log(`error checking if user ${userID} has a doc in 'users' collection already; error: ${error}`);
        return null;
    }
};