import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'


export const getFriendRecs = async friendList => {
    const querySnapshot = await firebase.firestore()
        .collection("recs")
        .where("username", "in", friendList)
        .get();
    
    if (!querySnapshot) return null;

    const recs = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));

    return recs;

};