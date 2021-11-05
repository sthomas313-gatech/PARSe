import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'

import { getCurrentUser } from '../auth/getCurrentUser';
import { getUserInfo } from './getUserInfo';


export const getCurrentUserInfo = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;

    return await getUserInfo(currentUser.id);
};