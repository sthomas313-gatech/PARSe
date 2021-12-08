import { getCurrentUser } from '../auth'; 
import { getFriendRequestsIn } from './getFriendRequestsIn';

export const getCurrentUserFriendRequestsIn = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    return await getFriendRequestsIn(currentUser.id);
}