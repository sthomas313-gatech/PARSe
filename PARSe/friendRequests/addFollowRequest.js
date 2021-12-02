import { checkCollectionDocExists, createCollectionDoc, updateCollectionDoc } from '../firestore_helpers';

export const addFollowRequest = async (requestingUserID, otherUserID) => {

    const collection = "friendRequests";

    console.log(`addFriendRequest:`);

    if (!requestingUserID || !otherUserID) {
        console.log(`either no requestingUserID or no otherUserID provided: ${requestingUserID}, ${otherUserID}`);
        return;
    }

    const friendRequestUpdate = {};
    friendRequestUpdate[otherUserID] = true;

    // check if doc exists in 'friendRequests' collection
    let exists = await checkCollectionDocExists(collection, requestingUserID);
    console.log(`friendRequests doc exists? ${exists}`);
    if (exists == null) {
        console.log(`going into exists == null if statement`);
        return;
    }
    console.log(`going to do something...`);

    // Create 'friendRequests' document or update 'friendRequests' document
    if (exists == false) {
        createCollectionDoc(collection, requestingUserID, friendRequestUpdate).then(() => {
            console.log(`created new friendRequests doc for userID: ${requestingUserID}`);
        });
    } else if (exists == true) {
        updateCollectionDoc(collection, requestingUserID, friendRequestUpdate).then(() => {
            console.log(`updated existing friendRequests doc for userID: ${requestingUserID}`);
        });
    }
};