import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'

export const checkUsernameAvailability = async (username) => {
    
    const querySnapshot = await firebase.firestore()
        .collection("users")
        .where("username", "==", username)
        .limit(1)
        .get();
    
    if (!querySnapshot) return null;

    const recs = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));

    if (recs.length == 0) {
        return true; // username is unique
    } else {
        return false; // username is not unique
    }
}