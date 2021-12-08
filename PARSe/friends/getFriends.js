import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'



export const getFriends = async userID => {
    const result = await firebase.firestore()
        .collection("friends")
        .doc(userID)
        .get();
    
    if (!result) return {friendList: [], userID: userID}; // no friends?
    
    const friends = result.data();

    // console.log(`getFriends: ${JSON.stringify(friends, undefined, 2)}`);

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