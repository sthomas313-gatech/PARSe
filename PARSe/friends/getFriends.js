import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'



export const getFriends = async userID => {
    const result = await firebase.firestore()
        .collection("friends")
        .doc(userID)
        .get();
    
    const friends = result.data();

    if (!friends) return null;

    const friendList = Object.keys(friends);
    const filteredFriendList = friendList.filter(function(userID) {
        return friends[userID]
    });
    
    return {
        friendList: filteredFriendList,
        userID: friends.id
    }
};