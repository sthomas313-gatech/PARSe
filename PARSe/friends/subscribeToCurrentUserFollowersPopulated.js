import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentUserFriendStatus } from '.';
import { getCurrentUser } from '../auth'
import { getCurrentUserFriendRequestStatus } from '../friendRequests';
import { populateUsers } from '../user';
import { mapAsync } from '../util';

export const subscribeToCurrentUserFollowersPopulated = (cb) => {

    const currentUser = getCurrentUser();
    if (!currentUser) return cb([]);

    const callback = async (querySnapshot) => {

        var followersList = [];
        querySnapshot.docs.forEach(doc => {
            followersList.push(doc.id);
        });

        // console.log(`followersList in subscribeToCurrentUserFollowersPopulated callback: ${followersList}`);

        const populatedFollowers = await populateUsers(followersList);
        // console.log(`populatedFollowers in subscribeToCurrentUserFriendsPopulated callback: ${populatedFollowers}`);

        const populatedFollowersAndStatuses = await mapAsync(populatedFollowers, async (user) => {
            const friendStatus = await getCurrentUserFriendStatus(user.userID);
            const friendRequestStatus = await getCurrentUserFriendRequestStatus(user.userID);
            return {
                ...user,
                friendStatus: friendStatus,
                friendRequestStatus: friendRequestStatus
            };
        });
        // console.log(`populatedFollowersAndStatuses in subscribeToCurrentUserFriendsPopulated callback: ${populatedFollowersAndStatuses}`);

        cb(populatedFollowersAndStatuses);

    }

    return firebase.firestore()
        .collection("friends")
        .where(currentUser.id, "==", true)
        .onSnapshot(callback);
}