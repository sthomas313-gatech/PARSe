import { getCurrentUser } from '../auth'; 
import { removeFriend } from './removeFriend';

export const removeCurrentUserFriend = async (otherUserID) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    removeFriend(currentUser.id, otherUserID);
}