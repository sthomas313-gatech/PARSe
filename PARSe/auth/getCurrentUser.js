import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'

export const getCurrentUser = () => {
    const user = firebase.auth().currentUser;
    if (!user) {
        return null;
    }
    return {
        id: user.uid
    };
}