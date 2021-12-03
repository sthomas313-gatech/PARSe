import { updateCollectionDoc } from "../firestore_helpers";


export const removeFriendRequest = async (requestingUserID, otherUserID) => {

    const collection = "friendRequests";

    console.log(`removeFriendRequest:`);

    if (!requestingUserID || !otherUserID) {
        console.log(`either no requestingUserID or no otherUserID provided: ${requestingUserID}, ${otherUserID}`);
        return;
    }

    const update = {};
    update[otherUserID] = false;

    updateCollectionDoc(collection, requestingUserID, update);
}