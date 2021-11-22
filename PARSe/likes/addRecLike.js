import { checkRecLikesDocExists } from './checkRecLikesDocExists';
import { updateRecLikesDoc } from './updateRecLikesDoc';
import { createRecLikesDoc } from './createRecLikesDoc';


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
        createRecLikesDoc(recID, recLikesUpdate).then(() => {
            console.log(`created new recLikes doc for recID: ${recID}`);
        });
    } else if (exists == true) {
        updateRecLikesDoc(recID, recLikesUpdate).then(() => {
            console.log(`updated existing recLikes doc for recID: ${recID}`);
        });
    }
}