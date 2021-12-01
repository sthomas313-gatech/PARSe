import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentUser } from '../auth'
import { populateUsers } from '../user';

export const subscribeToCurrentUserFollowersPopulated = (cb) => {

    const currentUser = getCurrentUser();
    if (!currentUser) return cb([]);

    const callback = async (querySnapshot) => {

        var followersList = [];
        querySnapshot.docs.forEach(doc => {
            followersList.push(doc.id);
        });

        console.log(`followersList in subscribeToCurrentUserFollowersPopulated callback: ${followersList}`);

        const populatedFollowers = await populateUsers(followersList);
        console.log(`populatedFollowers in subscribeToCurrentUserFriendsPopulated callback: ${populatedFollowers}`);

        cb(populatedFollowers);

    }

    return firebase.firestore()
        .collection("friends")
        .where(currentUser.id, "==", true)
        .onSnapshot(callback);
}