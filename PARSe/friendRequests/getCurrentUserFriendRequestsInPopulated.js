import { getCurrentUserFriendRequestsIn } from '.';
import { populateUsers } from '../user';

export const getCurrentUserFriendRequestsInPopulated = async () => {

    const friendRequests =  await getCurrentUserFriendRequestsIn();

    if (!friendRequests) return null;
    if (!("friendRequestsIn" in friendRequests)) return null;

    return await populateUsers(friendRequests.friendRequestsIn);
}