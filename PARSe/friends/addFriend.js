import { checkCollectionDocExists, createCollectionDoc, updateCollectionDoc } from '../firestore_helpers';


export const addFriend = async (requestingUserID, otherUserID) => {

    const collection = "friends";

    console.log(`addFriend:`);

    if (!requestingUserID || !otherUserID) {
        console.log(`either no requestingUserID or no otherUserID provided: ${requestingUserID}, ${otherUserID}`);
        return;
    }

    const update = {};
    update[otherUserID] = true;

    // check if doc exists in 'friendRequests' collection
    let exists = await checkCollectionDocExists(collection, requestingUserID);
    console.log(`friendRequests doc exists? ${exists}`);
    if (exists == null) {
        console.log(`going into exists == null if statement`);
        return;
    }
    console.log(`going to do something...`);

    // Create 'friends' document or update 'friends' document
    if (exists == false) {
        createCollectionDoc(collection, requestingUserID, update).then(() => {
            console.log(`created new '${collection}' doc for userID: ${requestingUserID}`);
        });
    } else if (exists == true) {
        updateCollectionDoc(collection, requestingUserID, update).then(() => {
            console.log(`updated existing '${collection}' doc for userID: ${requestingUserID}`);
        });
    }
};