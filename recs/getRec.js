import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

export const getRec = async (recID) => {
    const recDoc = await firebase.firestore()
        .collection("recs")
        .doc(recID)
        .get()
    
    if (!recDoc) return null;

    const rec = recDoc.data();
    // console.log(`getting rec: ${recDoc.id}; rec: ${rec}`);
    if (!rec) return null;
    
    return {
        ...rec,
        id: recDoc.id
    };
}