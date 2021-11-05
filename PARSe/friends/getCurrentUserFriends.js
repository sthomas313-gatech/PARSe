import { getFriends } from './getFriends';
import { getCurrentUserInfo } from '../user/getCurrentUserInfo';


export const getCurrentUserFriends = async () => {
    const currentUserInfo = await getCurrentUserInfo();
    if (!currentUserInfo) return null;
    
    return await getFriends(currentUserInfo.username);
};