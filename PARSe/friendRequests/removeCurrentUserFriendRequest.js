import { getCurrentUser } from '../auth'; 
import { removeFriendRequest } from './removeFriendRequest';

export const removeCurrentUserFriendRequest = async (otherUserID) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    removeFriendRequest(currentUser.id, otherUserID);
}