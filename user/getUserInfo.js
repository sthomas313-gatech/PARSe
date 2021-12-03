import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'


export const getUserInfo = async userId => {
    const userInfoDoc = await firebase.firestore()
        .collection("users")
        .doc(userId)
        .get();
    
    const userInfo = userInfoDoc.data();

    if (!userInfo) return null;

    return {
        ...userInfo,
        id: userInfoDoc.id
    };

};