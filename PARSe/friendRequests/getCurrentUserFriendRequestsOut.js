import { getCurrentUser } from '../auth'; 
import { getFriendRequestsOut } from './getFriendRequestsOut';

export const getCurrentUserFriendRequestsOut = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    return await getFriendRequestsOut(currentUser.id);
}