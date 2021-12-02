import * as React from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  TouchableOpacity,
  Button,
  Alert
  } from 'react-native';
  
import { Card } from 'react-native-paper';
import ProfilePic from './ProfilePic';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { acceptFollowRequestWithCurrentUser, addCurrentUserFollowRequest, declineFollowRequestWithCurrentUser, removeCurrentUserFriendRequest } from '../friendRequests';
import { unfollowOtherUserWithCurrentUser } from '../friends';

// TODO: implement way to accept/reject follow request, followed by a "follow back" button
export default function UserCard( {navigation, userInfo, acceptReject=false, follow=false, unfollow=false, cancelRequest=false, setForceRefresh=null, forceRefresh=null} ) {
    const [buttonPressed, setButtonPressed] = React.useState(0);
    // const [refreshing, setRefreshing] = React.useState(false);
    // console.log(`just in the middle of the function here, buttonPressed is ${buttonPressed}`);

    const handleSubmitFollowRequest = () => {
      // console.log(`handle submit follow request`);
      addCurrentUserFollowRequest(userInfo.id).then(() => {
        // console.log(`UserCard buttonPressed value was set to ${buttonPressed}`);
        setButtonPressed(buttonPressed + 1);
        // console.log(`UserCard set buttonPressed value to ${buttonPressed}`);
      });
    };

    const handleSubmitUnfollowRequest = () => {
      // console.log(`handle submit unfollow request; not implemented yet`);
      unfollowOtherUserWithCurrentUser(userInfo.id).then(() => {
        setButtonPressed(buttonPressed + 1);
        // console.log(`UserCard set buttonPressed value to ${buttonPressed}`);
      });
    };

    const handleSubmitCancelRequest = () => {
      removeCurrentUserFriendRequest(userInfo.id).then(() => {
        // console.log(`UserCard buttonPressed value was set to ${buttonPressed}`);
        setButtonPressed(buttonPressed + 1);
        // console.log(`UserCard set buttonPressed value to ${buttonPressed}`);
      });
    };


    const handleAcceptFollowRequest = () => {
      acceptFollowRequestWithCurrentUser(userInfo.id).then(() => {
        setButtonPressed(buttonPressed + 1);
        // console.log(`UserCard set buttonPressed value to ${buttonPressed}`);
      });
    }

    const handleDeclineFollowRequest = () => {
      declineFollowRequestWithCurrentUser(userInfo.id).then(() => {
        setButtonPressed(buttonPressed + 1);
        // console.log(`UserCard set changed value to ${buttonPressed}`);
      });
    }

    // FORCE REFRESH
    React.useEffect( () => {
      // console.log(`UserCard buttonPressed hook: 'setButtonPressed' set to ${buttonPressed}`);
      if (buttonPressed > 0 && setForceRefresh) {
        setForceRefresh(true);
        // console.log(`UserCard buttonPressed hook: set force refresh to true`);
      }
  }, [buttonPressed]);


    const handleSubmitUnfollowRequestAlert = async () => {
      Alert.alert(
        "Are you sure?",
        `Are you sure you want to unfollow user: '${userInfo.firstName} ${userInfo.lastName}'?`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => handleSubmitUnfollowRequest() }
        ]
      );
      
    }


    return (
        <Card style={styles.cardView} onPress={() => console.log(`implement navigate to OtherProfileScreen`)} >
            <View style={topRowStyles.topRow} >

                <View>
                    <ProfilePic pictureURL={userInfo && "profilePicture" in userInfo && userInfo.profilePicture} />
                </View>

                <View style={topRowStyles.topRight} >

                    <View style={topRowStyles.nameRow} >
                        <Text style={topRowStyles.nameText} >{userInfo.firstName} {userInfo.lastName}</Text>
                    </View>

                    <View style={topRowStyles.usernameRow}>
                        <Text style={topRowStyles.usernameText} >@{userInfo.username}</Text>
                    </View>

                </View>
                    
                {acceptReject && <View style={styles.row} > 
                    <TouchableOpacity onPress={handleAcceptFollowRequest} >
                        <MaterialCommunityIcons style={topRowStyles.acceptButton} name="check-circle" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeclineFollowRequest} >
                        <MaterialCommunityIcons style={topRowStyles.rejectButton} name="close-circle" />
                    </TouchableOpacity>
                </View>
                }    

                {follow && <View style={styles.row} > 
                    <Button title="Follow" onPress={handleSubmitFollowRequest} />
                </View>
                }   

                {unfollow && <View style={styles.row} > 
                    <Button color="red" title="Unfollow" onPress={handleSubmitUnfollowRequestAlert} />
                </View>
                }   

                {cancelRequest && <View style={styles.row} > 
                    <Button color="orange" title="Cancel Request" onPress={handleSubmitCancelRequest} />
                </View>
                }  

            </View>

        </Card>


    );
}

const styles = StyleSheet.create({
    cardView: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      margin: 3,
      flexDirection: "row",
      fontFamily: "Arial",
      fontSize: 100,
      backgroundColor: "rgb(252, 252, 252)",
      borderRadius: 10,
      padding: 0
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
  });


  const topRowStyles = StyleSheet.create({
    topRow: {
      flexDirection: "row",
      padding: 3
    },
    topRight: {
      justifyContent: "center",
      flex: 1,
      paddingRight: 5
    },
    nameRow: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      flex: 1,
    },
    usernameRow: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      padding: 0
    },
    nameText: {
      fontFamily: "Helvetica",
      fontSize: 16,
    },
    usernameText: {
      fontFamily: "Helvetica",
      fontSize: 14,
      color: "rgb(129, 129, 129)",
      padding: 0,
      margin: 0
    },
    restaurantText: {
      fontFamily: "Helvetica",
      fontWeight: "bold",
      fontSize: 16,
      justifyContent: "space-between"
    },
    acceptButton: {
      fontSize: 40,
      color: "green"
    },
    rejectButton: {
        fontSize: 40,
        color: "red"
    },
    locationText: {
      fontFamily: "Helvetica",
      fontSize: 14,
      color: "rgb(42,42,42)",
      justifyContent: "center",
      alignItems: "center",
    },
    locationPinRow: {
      flexDirection: "row",
      alignItems: "center"
  
    }
  })