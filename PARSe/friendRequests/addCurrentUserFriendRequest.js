import { getCurrentUser } from '../auth'; 
import { addFriendRequest } from './addFriendRequest';

export const addCurrentUserFriendRequest = async (otherUserID) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    addFriendRequest(currentUser.id, otherUserID);
}