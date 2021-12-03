// firestore
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';


export const getCurrentTimestamp = () => {
    return firebase.firestore.Timestamp.now();
}