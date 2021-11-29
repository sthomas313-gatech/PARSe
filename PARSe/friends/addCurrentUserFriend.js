import { getCurrentUser } from '../auth'; 
import { addFriend } from './addFriend';

export const addCurrentUserFriend = async (otherUserID) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    addFriend(currentUser.id, otherUserID);
}