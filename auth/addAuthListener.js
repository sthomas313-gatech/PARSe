import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'

export const addAuthListener = (callback) => {
    const onChange = (user) => {
        if (user) {
            callback({});
        } else {
            callback(null);
        }
    }
    return firebase.auth().onAuthStateChanged(onChange)
}