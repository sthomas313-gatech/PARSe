import { updateRecLikesDoc } from './updateRecLikesDoc';

// TODO
export const removeRecLike = async (recID, userID) => {

    console.log(`removeRecLike:`)

    if (!recID || !userID) {
        console.log(`either no recID or no userID provided: ${recID}, ${userID}`);
        return;
    }

    const recLikesUpdate = {};
    recLikesUpdate[userID] = false;

    updateRecLikesDoc(recID, recLikesUpdate);
}