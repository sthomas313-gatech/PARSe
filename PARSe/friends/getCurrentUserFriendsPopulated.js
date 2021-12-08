import { getFriends } from './getFriends';
import { getCurrentUserInfo } from '../user/getCurrentUserInfo';
import { getCurrentUser } from '../auth';
import { getCurrentUserFriends } from '.';
import { populateUsers } from '../user';


export const getCurrentUserFriendsPopulated = async () => {
    const currentUserFriends = await getCurrentUserFriends();

    if (!currentUserFriends) return null;
    if (!("friendList" in currentUserFriends)) return null;

    return await populateUsers(currentUserFriends.friendList);
};