import { removeFriendRequest } from "./removeFriendRequest"

export const declineFollowRequest = async (userID, otherUserID) => {
    console.log(`declineFollowRequest: ${userID}, ${otherUserID}`);
    await removeFriendRequest(otherUserID, userID);
    return true;
};
