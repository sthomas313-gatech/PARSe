import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentUser } from '../auth/getCurrentUser';
import { getCurrentTimestamp } from '../time';

export const updateCurrentUserInfo = async updates => {
    const currentUser = getCurrentUser();

    if (!currentUser) return;

    await firebase.firestore()
        .collection("users")
        .doc(currentUser.id)
        .update({...updates, updated: getCurrentTimestamp()});
};