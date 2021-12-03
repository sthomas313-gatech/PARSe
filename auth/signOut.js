import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'

export const signOut = async () => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        throw new Error("error signing out");
    }
}