import { getCurrentUserFriendStatus } from ".";
import { getCurrentUserFriendRequestStatus } from "../friendRequests";
import { searchUsers } from "../user"
import { mapAsync } from "../util";


export const populateSearchUsersCurrentUserStatuses = async (searchStr) => {
    const searchResults = await searchUsers(searchStr);
    const populatedResults = mapAsync(searchResults, async (user) => {
        const friendStatus = await getCurrentUserFriendStatus(user.id);
        const friendRequestStatus = await getCurrentUserFriendRequestStatus(user.id);
        return {
            ...user,
            friendStatus: friendStatus,
            friendRequestStatus: friendRequestStatus
        };

    });

    return populatedResults;
}