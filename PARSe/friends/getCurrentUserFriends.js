import { getFriends } from './getFriends';
import { getCurrentUserInfo } from '../user/getCurrentUserInfo';
import { getCurrentUser } from '../auth';


export const getCurrentUserFriends = async () => {
    // const currentUserInfo = await getCurrentUserInfo();
    const currentUser = getCurrentUser();

    if (!currentUser) return null;
    
    return await getFriends(currentUser.id);
};