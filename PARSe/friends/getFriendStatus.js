import { getFriends } from '.';



export const getFriendStatus = async (requestingUserID, otherUserID) => {

    const result = await getFriends(requestingUserID);
    if (!result) {
        console.log(`getFriendStatus: error getting friends of ${requestingUserID}`);
        return null;
    }

    if (result.friendList.includes(otherUserID)) {
        return true;
    } else {
        return false;
    }
};