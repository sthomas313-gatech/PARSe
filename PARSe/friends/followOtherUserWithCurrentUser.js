import { getCurrentUser } from '../auth'; 
import { followOtherUser } from './followOtherUser';

export const followOtherUserWithCurrentUser = async (otherUserID) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    followOtherUser(currentUser.id, otherUserID);
}