import { updateCollectionDoc } from "../firestore_helpers";


export const removeFriend = async (requestingUserID, otherUserID) => {

    const collection = "friends";

    console.log(`removeFriend:`);

    if (!requestingUserID || !otherUserID) {
        console.log(`either no requestingUserID or no otherUserID provided: ${requestingUserID}, ${otherUserID}`);
        return;
    }

    const update = {};
    update[otherUserID] = false;

    updateCollectionDoc(collection, requestingUserID, update);
}