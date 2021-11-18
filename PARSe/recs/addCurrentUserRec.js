import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { firestore } from 'firebase-admin';
import { getCurrentUser } from '../auth/getCurrentUser';

export const addCurrentUserRec = async (rec) => {

    // Get Current User, to use user ID in firestore lookups
    const currentUser = getCurrentUser();

    if (!currentUser) return;


    // Add user ID to recommendation; store in firestore 'recs' collection
    rec["userID"] = currentUser.id;
    const createdRecDoc = await firebase.firestore()
        .collection("recs")
        .add(rec);
    
    if (!createdRecDoc) {
        console.log(`issue after writing new recommendation to 'recs' collection`);
        return;
    }

    console.log(`document created, id: ${createdRecDoc.id}`);


    // Use created 'recs' document ID to create an entry in 'userRecs' collection
    const userRecsUpdate = {};
    userRecsUpdate[createdRecDoc.id] = true;

    // check if doc exists in 'userRecs' collection
    let exists = await checkUserRecsDocExists(currentUser.id);
    console.log(`userRecs doc exists? ${exists}`);
    if (exists == null) {
        console.log(`going into exists == null if statement`);
        return;
    }
    console.log(`going to do something...`);

    // Create 'userRecs' document or update 'userRecs' document
    if (exists == false) {
        createUserRecs(currentUser.id, userRecsUpdate).then(() => {
            console.log(`created new userRecs doc for user id: ${currentUser.id}`);
        });
    } else if (exists == true) {
        updateUserRecs(currentUser.id, userRecsUpdate).then(() => {
            console.log(`updated existing userRecs doc for user id: ${currentUser.id}`);
        });
    }

    
    
    
};



const checkUserRecsDocExists = async (uid) => {
    try {
        const docRef = await firebase.firestore()
            .collection("userRecs")
            .doc(uid)
            .get();
        console.log(`checkUserRecsDocExists resolving to ${docRef.exists}`);
        return docRef.exists;
    } catch (error) {
        console.log(`error checking if user ${uid} has a doc in 'userRecs' collection already; error: ${error}`);
        return null;
    }
};


const updateUserRecs = async (docID, userRecsUpdate) => {
    firebase.firestore()
        .collection("userRecs")
        .doc(docID)
        .update(userRecsUpdate);
};


const createUserRecs = async (docID, userRecsUpdate) => {
    firebase.firestore()
        .collection("userRecs")
        .doc(docID)
        .set(userRecsUpdate);
}