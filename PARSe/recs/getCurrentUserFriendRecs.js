import { getFriendRecs } from './getFriendRecs';
import { getCurrentUserFriends } from '../friends/getCurrentUserFriends';


export const getCurrentUserFriendRecs = async () => {
    const currentUserFriendsList = await getCurrentUserFriends();
    if (!currentUserFriendsList) return null;

    return await getFriendRecs(currentUserFriendsList);
};