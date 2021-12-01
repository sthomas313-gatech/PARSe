import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentUser } from '../auth'
import { populateUsers } from '../user';

export const subscribeToCurrentUserFollowingPopulated = (cb) => {

    const currentUser = getCurrentUser();
    if (!currentUser) return cb([]);

    const callback = async (docSnapshot) => {
        const friends = docSnapshot.data();
        console.log(`friends in subscribeToCurrentUserFriendsPopulated callback: ${friends}`);
        if (!friends) {
            console.log(`error in subscribeToCurrentUserFriendsPopulated`);
            return null;
        }

        const friendList = Object.keys(friends);
        const filteredFriendList = friendList.filter(function(userID) {
            return friends[userID]
        });

        const populatedFriends = await populateUsers(filteredFriendList);
        console.log(`populatedFriends in subscribeToCurrentUserFriendsPopulated callback: ${populatedFriends}`);

        cb(populatedFriends);

    }

    return firebase.firestore()
        .collection("friends")
        .doc(currentUser.id)
        .onSnapshot(callback);
}