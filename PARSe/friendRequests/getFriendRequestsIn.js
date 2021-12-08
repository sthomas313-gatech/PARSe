
import { getCollectionDocsWhere } from '../firestore_helpers';



export const getFriendRequestsIn = async (userID) => {

    const collection = "friendRequests";

    const friendRequests = await getCollectionDocsWhere(collection, [userID, "==", true]);

    if (!friendRequests) return null;

    var friendRequestList = [];
    friendRequests.forEach((item) => {
        friendRequestList.push(item.id);
    })

    return {
        friendRequestsIn: friendRequestList,
        userID: userID
    }
};