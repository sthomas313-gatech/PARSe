import { getCurrentUser } from '../auth'; 
import { acceptFollowRequest } from './acceptFollowRequest';

export const acceptFollowRequestWithCurrentUser = async (otherUserID) => {
    currentUser = getCurrentUser();
    if (!currentUser) return;

    return await acceptFollowRequest(currentUser.id, otherUserID);
}