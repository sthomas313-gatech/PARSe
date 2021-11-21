import { getCurrentUserFriends } from '../friends';
import { getUsersRecs } from './getUsersRecs';
import { getCurrentUser } from '../auth';


export const getCurrentUserAndFriendRecs = async (limit=4, orderBy={field: "created", direction: "desc"}, startAfter=null) => {

    const currentUserFriendsList = await getCurrentUserFriends();
    if (!currentUserFriendsList) return null;
    if (!("friendList" in currentUserFriendsList)) return null;

    const currentUser = getCurrentUser();
    currentUserFriendsList.friendList.push(currentUser.id);
    // console.log(`getCurrentUserAndFriendRecs: currentUserandFriendsList: ${JSON.stringify(currentUserFriendsList.friendList)}`);

    return await getUsersRecs(currentUserFriendsList.friendList, 
                                limit=limit, 
                                orderBy=orderBy,
                                startAfter=startAfter);

}