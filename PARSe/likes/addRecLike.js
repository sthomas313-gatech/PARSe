import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentTimestamp } from '../time';
import { checkRecLikesDocExists } from './checkRecLikesDocExists';


export const addRecLike = async (recID, userID) => {

    console.log(`addRecLike:`)

    if (!recID || !userID) {
        console.log(`either no recID or no userID provided: ${recID}, ${userID}`);
        return;
    }

    const recLikesUpdate = {};
    recLikesUpdate[userID] = true;

    // check if doc exists in 'recLikes' collection
    let exists = await checkRecLikesDocExists(recID);
    console.log(`recLikes doc exists? ${exists}`);
    if (exists == null) {
        console.log(`going into exists == null if statement`);
        return;
    }
    console.log(`going to do something...`);

    // Create 'recLikes' document or update 'recLikes' document
    if (exists == false) {
        createRecLikes(recID, recLikesUpdate).then(() => {
            console.log(`created new recLikes doc for recID: ${recID}`);
        });
    } else if (exists == true) {
        updateRecLikes(recID, recLikesUpdate).then(() => {
            console.log(`updated existing recLikes doc for recID: ${recID}`);
        });
    }
}



const updateRecLikes = async (docID, recLikesUpdate) => {
    firebase.firestore()
        .collection("recLikes")
        .doc(docID)
        .update({...recLikesUpdate, updated: getCurrentTimestamp()});
};


const createRecLikes = async (docID, recLikesUpdate) => {
    firebase.firestore()
        .collection("recLikes")
        .doc(docID)
        .set({...recLikesUpdate, created: getCurrentTimestamp()});
}