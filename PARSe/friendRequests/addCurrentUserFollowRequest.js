import { getCurrentUser } from '../auth'; 
import { addFollowRequest } from './addFollowRequest';

export const addCurrentUserFollowRequest = async (otherUserID) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    addFollowRequest(currentUser.id, otherUserID);
}