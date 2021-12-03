import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'

export const signIn = async (email, password) => {
    try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        return {};
    } catch (e) {
        throw new Error("error signing in");
    }
}