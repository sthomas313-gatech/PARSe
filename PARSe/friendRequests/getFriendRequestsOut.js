
import { getCollectionDoc } from '../firestore_helpers';



export const getFriendRequestsOut = async userID => {

    const collection = "friendRequests";

    const result = await getCollectionDoc(collection, userID);
    
    const friendRequests = result.data();

    if (!friendRequests) return null;

    const friendRequestList = Object.keys(friendRequests);
    const filteredFriendRequestList = friendRequestList.filter((otherUserID) => {
        return friendRequests[otherUserID]
    });
    
    return {
        friendRequestsOut: filteredFriendRequestList,
        userID: friends.id
    }
};