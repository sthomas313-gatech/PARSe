// import { getFriendRecs } from './getFriendRecs';
import { getCurrentUserFriends } from '../friends/getCurrentUserFriends';
import { getUsersRecs } from "./getUsersRecs";


export const getCurrentUserFriendRecs = async () => {
    const currentUserFriendsList = await getCurrentUserFriends();
    if (!currentUserFriendsList) return null;

    console.log(`getCurrentUserFriendRecs: currentUserFriendsList: ${JSON.stringify(currentUserFriendsList)}`);

    return await getUsersRecs(currentUserFriendsList.friendList);
};