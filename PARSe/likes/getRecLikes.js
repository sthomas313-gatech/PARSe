import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
// import { getCurrentTimestamp } from '../time';


export const getRecLikes = async (recID) => {
    console.log(`getRecLikes:`);
    const recLikesDoc = await firebase.firestore()
        .collection("recLikes")
        .doc(recID)
        .get();
    
    if (!recLikesDoc) {
        console.log(`no likes I suppose?`);
    }

    const recLikes = recLikesDoc.data();

    if (!recLikes) return null;

    return {
        ...recLikes,
        id: recLikesDoc.id
    };
}