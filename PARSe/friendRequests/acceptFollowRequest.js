import { followOtherUser } from "../friends";
import { removeFriendRequest } from "./removeFriendRequest"



export const acceptFollowRequest = async (userID, otherUserID) => {
    console.log(`acceptFollowRequest: ${userID}, ${otherUserID}`);
    await removeFriendRequest(otherUserID, userID);
    await followOtherUser(otherUserID, userID);
    return true;
};
