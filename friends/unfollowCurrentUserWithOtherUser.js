import { getCurrentUser } from '../auth'; 
import { unfollowOtherUser } from './unfollowOtherUser';

export const unfollowCurrentUserWithOtherUser = async (otherUserID) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    unfollowOtherUser(otherUserID, currentUser.id);
}