import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentUserFriendStatus } from '.';
import { getCurrentUser } from '../auth'
import { getCurrentUserFriendRequestStatus } from '../friendRequests';
import { populateUsers } from '../user';
import { mapAsync } from '../util';

export const subscribeToCurrentUserFollowingPopulated = (cb) => {

    const currentUser = getCurrentUser();
    if (!currentUser) return cb([]);

    const callback = async (docSnapshot) => {
        const friends = docSnapshot.data();
        // console.log(`subscribeToCurrentUserFriendsPopulated friends: ${JSON.stringify(friends, undefined, 2)}`);
        if (!friends) {
            console.log(`error in subscribeToCurrentUserFriendsPopulated`);
            return null;
        }

        const friendList = Object.keys(friends);
        // console.log(`subscribeToCurrentUserFriendsPopulated friendList: ${friendList}`);
        const filteredFriendList = friendList.filter(function(userID) {
            return friends[userID] && userID != "updated" && userID != "created";
        });
        // console.log(`subscribeToCurrentUserFriendsPopulated filteredFriendList: ${filteredFriendList}`);

        const populatedFriends = await populateUsers(filteredFriendList);

        // console.log(`subscribeToCurrentUserFriendsPopulated populatedFriends: ${JSON.stringify(populatedFriends)}`);

        const populatedFriendsAndStatuses = await mapAsync(populatedFriends, async (user) => {
            const friendStatus = await getCurrentUserFriendStatus(user.userID);
            // console.log(`subscribeToCurrentUserFriendsPopulated friendStatus: ${friendStatus}`);
            const friendRequestStatus = await getCurrentUserFriendRequestStatus(user.userID);
            // console.log(`subscribeToCurrentUserFriendsPopulated friendRequestStatus: ${friendRequestStatus}`);
            return {
                ...user,
                friendStatus: friendStatus,
                friendRequestStatus: friendRequestStatus
            };
        });
        

        // console.log(`populatedFriendsAndStatuses in subscribeToCurrentUserFriendsPopulated callback: ${JSON.stringify(populatedFriendsAndStatuses, undefined, 2)}`);

        cb(populatedFriendsAndStatuses);

    }

    return firebase.firestore()
        .collection("friends")
        .doc(currentUser.id)
        .onSnapshot(callback);
}