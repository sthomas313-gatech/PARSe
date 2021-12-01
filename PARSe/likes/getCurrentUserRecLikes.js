import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { getCurrentUser } from '../auth';
import { getRecsFromRecIDList } from '../recs';

export const getCurrentUserRecLikes = async () => {
    // console.log(`getCurrentUserRecLikes:`);

    currentUser = getCurrentUser();
    if (!currentUser) return null;

    const querySnapshot = await firebase.firestore()
        .collection("recLikes")
        .where(currentUser.id, "==", true)
        .get();

    var recIDList = [];
    querySnapshot.docs.forEach(doc => {
        recIDList.push(doc.id);
    });

    // console.log(`getCurrentUserRecLikes, recIDList: ${recIDList}`);

    return getRecsFromRecIDList(recIDList);
}