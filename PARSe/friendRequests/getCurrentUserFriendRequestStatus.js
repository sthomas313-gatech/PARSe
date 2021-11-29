import { getCurrentUser } from '../auth'; 
import { getFriendRequestStatus } from './getFriendRequestStatus';

export const getCurrentUserFriendRequestStatus = async (otherUserID) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    return await getFriendRequestStatus(currentUser.id, otherUserID);
}