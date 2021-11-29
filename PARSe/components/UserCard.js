import * as React from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  TouchableOpacity
  } from 'react-native';
  
import { Card } from 'react-native-paper';
import ProfilePic from './ProfilePic';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// TODO: implement way to accept/reject follow request, followed by a "follow back" button
export default function UserCard( {navigation, userInfo, acceptReject=false} ) {



    return (
        <Card style={styles.cardView} onPress={() => console.log("implement navigate to OtherProfileScreen")} >
            <View style={topRowStyles.topRow} >

                <View>
                    <ProfilePic pictureURL={"profilePicture" in userInfo && userInfo.profilePicture} />
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
                    <TouchableOpacity onPress={() => console.log("not functional yet")} >
                        <MaterialCommunityIcons style={topRowStyles.acceptButton} name="check-circle" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log("not functional yet")} >
                        <MaterialCommunityIcons style={topRowStyles.rejectButton} name="close-circle" />
                    </TouchableOpacity>
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