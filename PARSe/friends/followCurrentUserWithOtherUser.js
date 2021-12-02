import { getCurrentUser } from '../auth'; 
import { followOtherUser } from './followOtherUser';

export const followCurrentUserWithOtherUser = async (otherUserID) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    followOtherUser(otherUserID, currentUser.id);
}