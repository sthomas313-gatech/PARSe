import { getCurrentUser } from '../auth'; 
import { unfollowOtherUser } from './unfollowOtherUser';

export const unfollowOtherUserWithCurrentUser = async (otherUserID) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    unfollowOtherUser(currentUser.id, otherUserID);
}