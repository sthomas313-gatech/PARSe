import { getFriendRequestsIn } from "./getFriendRequestsIn";
import { getFriendRequestsOut } from "./getFriendRequestsOut";


export const getFriendRequestStatus = async (requestingUserID, otherUserID) => {

    var returnObj = {};
    returnObj.requestIn = null;
    returnObj.requestOut = null;

    const requestsIn = await getFriendRequestsIn(requestingUserID);
    // console.log(`getFriendRequestStatus requestsIn: ${requestsIn}`);

    if (requestsIn && requestsIn.friendRequestsIn.includes(otherUserID)) {
        returnObj.requestIn = true;
    } else {
        returnObj.requestIn = false;
    }

    const requestsOut = await getFriendRequestsOut(requestingUserID);
    // console.log(`getFriendRequestStatus requestsOut: ${requestsOut}`);

    if (requestsOut && requestsOut.friendRequestsOut.includes(otherUserID)) {
        returnObj.requestOut = true;
    } else {
        returnObj.requestOut = false;
    }

    return returnObj;
};