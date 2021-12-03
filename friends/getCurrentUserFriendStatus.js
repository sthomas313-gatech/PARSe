
import { getCurrentUser } from '../auth';
import { getFriendStatus } from './getFriendStatus';



export const getCurrentUserFriendStatus = async (otherUserID) => {
    const currentUser = getCurrentUser();

    if (!currentUser) return null;

    return await getFriendStatus(currentUser.id, otherUserID);
};