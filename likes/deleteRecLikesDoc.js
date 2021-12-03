import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

export const deleteRecLikesDoc = (recID) => {
    firebase.firestore()
        .collection("recLikes")
        .doc(recID)
        .delete()
};