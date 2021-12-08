import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentUser } from '../auth'
import { populateUsers } from '../user';

export const subscribeToCurrentUserFriendRequestsInPopulated = (cb) => {

    const currentUser = getCurrentUser();
    if (!currentUser) return cb([]);

    const callback = async (querySnapshot) => {

        var friendRequestsList = [];
        querySnapshot.docs.forEach(doc => {
            friendRequestsList.push(doc.id);
        });

        const populatedFriendRequests = await populateUsers(friendRequestsList);

        // console.log(`subscribeToCurrentUserFriendRequestsInPopulated: ${populatedFriendRequests}`);

        cb(populatedFriendRequests);

    }

    return firebase.firestore()
        .collection("friendRequests")
        .where(currentUser.id, "==", true)
        .onSnapshot(callback);

}