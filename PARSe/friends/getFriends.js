import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'



export const getFriends = async username => {
    const result = await firebase.firestore()
        .collection("friends")
        .doc(username)
        .get();
    
    const friends = result.data();

    if (!friends) return null;

    const friendList = Object.keys(friends);
    const filteredFriendList = friendList.filter(function(username) {
        return friends[username]
    });
    
    return {
        friendList: filteredFriendList,
        username: friends.id
    }
};