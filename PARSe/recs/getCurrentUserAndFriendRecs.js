import { getCurrentUserFriends } from '../friends';
import { getUsersRecs } from './getUsersRecs';
import { getCurrentUser } from '../auth';


export const getCurrentUserAndFriendRecs = async (limit=4, orderBy={field: "created", direction: "desc"}, startAfter=null) => {

    const currentUser = getCurrentUser();

    if (!currentUser) return null;

    var userList = [currentUser.id];

    const currentUserFriendsList = await getCurrentUserFriends();

    if ((currentUserFriendsList) && ("friendList" in currentUserFriendsList)) {
        userList = userList.concat(currentUserFriendsList.friendList);
    }

    return await getUsersRecs(userList, 
                                limit=limit, 
                                orderBy=orderBy,
                                startAfter=startAfter);

}