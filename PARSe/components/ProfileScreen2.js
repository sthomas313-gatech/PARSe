import * as React from 'react';
import { 
  View, 
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './Header';
import NavBar from './NavBar';
import ProfilePic from './ProfilePic';
import RecCard from "./RecCard";
import Accordion from 'react-native-collapsible/Accordion';



// Firestore data
import { getCurrentUserRecs } from '../recs';
import { getCurrentTimestamp } from '../time';
import { getCurrentUserInfo } from '../user';
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { subscribeToCurrentUserRecs } from '../recs';
import { getCurrentUserRecLikes } from '../likes';
import { signOut } from '../auth';
import { getCurrentUserFollowers, subscribeToCurrentUserFollowersPopulated, subscribeToCurrentUserFollowingPopulated } from '../friends';
import UserCard from './UserCard';
import { getCurrentUserFriendRequestsInPopulated } from '../friendRequests';


export default function ProfileScreen2( {navigation} ) {

    const [recCardsList, setRecCardsList] = React.useState([]);
    const [recsList, setRecsList] = React.useState([]);
    const [recLikesList, setRecLikesList] = React.useState([]);
    const [recLikesCardsList, setRecLikesCardsList] = React.useState([]);
    const [userInfo, setUserInfo] = React.useState(null);
    const [friendsList, setFriendsList] = React.useState([]);
    const [friendCardList, setFriendCardList] = React.useState([]);
    const [followersList, setFollowersList] = React.useState([]);
    const [followersCardList, setFollowersCardList] = React.useState([]);
    const [followRequestList, setFollowRequestList] = React.useState([]);
    const [followRequestCardList, setFollowRequestCardlist] = React.useState([]);

    const [activeSections, setActiveSections] = React.useState([0]);
    const [multipleSelect, setMultipleSelect] = React.useState(false);


    // set current user info 
    React.useEffect( () => {
        getCurrentUserInfo().then((result) => {
            setUserInfo(result);
        })
    }, []);


    // subscribe to real-time changes in the user's recommendations
    React.useEffect(() => {
        const unsubscribe = subscribeToCurrentUserRecs(results => {
            setRecsList(results);
        });
        return unsubscribe;
    }, []);

    // update recCardsList when recsList changes
    React.useEffect( () => {
        var tempRecCardsList = []
        recsList.forEach((rec) => {
            tempRecCardsList.push(<RecCard key={rec.id} rec={rec} editView={true} />)
        });
        setRecCardsList(tempRecCardsList);
    }, [recsList]);

    // get current user rec likes:
    React.useEffect( () => {
        getCurrentUserRecLikes()
            .then((result) => {
                const recLikes = result;
                setRecLikesList(recLikes);
                // console.log(`recLikesList set to: ${JSON.stringify(recLikesList, undefined, 2)}`);
            })
            .catch((error) => {
                console.log(`error from getCurrentUserRecLikes: ${error}`);
            });
    }, []);

    React.useEffect( () => {
        var tempRecLikesCardsList = [];
        recLikesList.forEach((rec) => {
            tempRecLikesCardsList.push(<RecCard key={rec.id} rec={rec} editView={false} />)
        });
        setRecLikesCardsList(tempRecLikesCardsList);
    }, [recLikesList]);


    // subscribe to real-time changes in the current user's friends
    React.useEffect(() => {
        const unsubscribe = subscribeToCurrentUserFollowingPopulated(results => {
            setFriendsList(results);
        });
        return unsubscribe;
    }, []);

    React.useEffect( () => {
        var tempUserCards = [];
        friendsList.forEach((user) => {
            if (user.id == currentUser.id) {
                tempUserCards.push(<UserCard key={user.userID} userInfo={user.user} />);
            } else if (user.friendStatus == true) {
                tempUserCards.push(<UserCard key={user.userID} userInfo={user.user} unfollow={true} />);
            } else if (user.friendRequestStatus.requestOut) {
                tempUserCards.push(<UserCard key={user.userID} userInfo={user.user} cancelRequest={true} />);
            } else {
                tempUserCards.push(<UserCard key={user.userID} userInfo={user.user} follow={true} />);
            }
            // tempUserCards.push(<UserCard key={user.userID} userInfo={user.user} />)
        });
        setFriendCardList(tempUserCards);
    }, [friendsList]);

    // subscribe to real-time changes in the current user's followers
    React.useEffect( () => {
        const unsubscribe = subscribeToCurrentUserFollowersPopulated(results => {
            console.log(`subscribeToCurrentUserFollowersPopulated: ${JSON.stringify(results)}`);
            setFollowersList(results);
        });
        return unsubscribe;
    }, []);

    React.useEffect( () => {
        var tempUserCards = [];
        followersList.forEach((user) => {
            if (user.id == currentUser.id) {
                tempUserCards.push(<UserCard key={user.userID} userInfo={user.user} />);
            } else if (user.friendStatus == true) {
                tempUserCards.push(<UserCard key={user.userID} userInfo={user.user} unfollow={true} />);
            } else if (user.friendRequestStatus.requestOut) {
                tempUserCards.push(<UserCard key={user.userID} userInfo={user.user} cancelRequest={true} />);
            } else {
                tempUserCards.push(<UserCard key={user.userID} userInfo={user.user} follow={true} />);
            }
            // tempUserCards.push(<UserCard key={user.userID} userInfo={user.user} />)
        });
        setFollowersCardList(tempUserCards);
    }, [followersList]);


    // get current user inbound friend requests
    React.useEffect( () => {
        getCurrentUserFriendRequestsInPopulated().then((result) => {
            console.log(result);
            setFollowRequestList(result);
        });
    }, []);

    React.useEffect( ( ) => {
        var tempFollowCards = [];
        followRequestList.forEach((user) => {
            tempFollowCards.push(<UserCard key={user.userID} userInfo={user.user} acceptReject={true} />)
        });
        setFollowRequestCardlist(tempFollowCards);
    }, [followRequestList]);


    const handleSignOut = () => {
        signOut()
            .then(() => {console.log(`signed out!`);})
            .catch((error) => {console.log(`error signing out: ${error}`);})
    }

    function SignOutButton () {
        return (
            <Button 
                title="Log Out" 
                style={styles.logoutButton}
                onPress={handleSignOut} 
            />
        )
    }


    const CONTENT = [
        {
            title: "Following",
            content: friendCardList
        },
        {
            title: "Followers",
            content: followersCardList
        },
        {
            title: "Follow Requests",
            content: followRequestCardList
        },
        {
            title: "My Recommendations",
            content: recCardsList
        },
        {
            title: "My Likes",
            content: recLikesCardsList
        },

    ];

    const setSections = (sections) => {
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };

    const renderContent = (section) => {
        return (
            <View>
                {section.content}
            </View>
        );
    };

    const renderSectionTitle = (section) => {
        return (
            <View style={styles.row}>
                <Text style={styles.text}>{section.title}</Text>
            </View>
        );
    };
    


    return (
        <SafeAreaView style={styles.loginSafeView}>
            <Header topLeftElement={<SignOutButton/>} />
            <ScrollView style={styles.container} >
                <View style={styles.userInfoView}>
                    <ProfilePic pictureURL={userInfo && userInfo.profilePicture} />
                    <View style={styles.userInfoView}>
                        <Text style={styles.nameStyle}>{userInfo && `${userInfo.firstName} ${userInfo.lastName}`}</Text>
                        <Text style={styles.userNameStyle}>@{userInfo && `${userInfo.username}`}</Text>
                    </View>
                </View>

                <View>
                    <Accordion
                        activeSections={activeSections}
                        sections={CONTENT}
                        // touchableComponent={TouchableOpacity}
                        expandMultiple={multipleSelect}
                        renderHeader={renderSectionTitle}
                        // renderSectionTitle={renderSectionTitle}
                        renderContent={renderContent}
                        duration={400}
                        onChange={setSections}
                        renderAsFlatList={false}
                    />
                </View>
                

                {/* <View style={styles.row}>
                    <Text style={styles.text}>My Lists</Text>
                    <Button title="Edit" />
                </View>
                <View>
                    <TouchableOpacity>
                        <Card style={styles.myListCard}><Text style={styles.text}>Been There</Text></Card>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Card style={styles.myListCard}><Text style={styles.text}>Want To Go</Text></Card>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Card style={styles.myListCard}><Text style={styles.text}>Austin TX Trip</Text></Card>
                    </TouchableOpacity>
                    <Button title="Add" />
                </View> */}
                

                
                <View style={styles.space}>
                    <Text></Text>
                </View>
            </ScrollView>
            
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // justifyContent: "center",
        // alignItems: "center"
    },
    userInfoView: {
        alignItems: "center"
    },
    nameStyle: {
        fontFamily: "Helvetica",
        fontSize: 25
    },
    userNameStyle: {
        fontFamily: "Helvetica",
        fontSize: 20,
        color: "rgb(129, 129, 129)",
    },
    loginSafeView: {
        justifyContent: "center",
        flex: 1,
        padding: 8,
        // margin: 18,
        // alignItems: "center"
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginTop: 10
    },
    space: {
        height: 80,
    },
    text: {
        fontFamily: "Helvetica",
        fontSize: 23
    },
    myListCard: {
        padding: 10,
        borderWidth: 1,
        borderColor:  "rgb(239, 187, 125)",
        marginTop: 2,
        marginBottom: 2
    },
    inputBox: {
        flex: 1,
        flexDirection: "row",
        height: 40,
        marginBottom: 12,
        marginTop: 2,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgb(250,250,250)"
    },
    buttonView: {
        borderRadius: 10,
        marginTop: 15
        // backgroundColor: "rgb(254, 254, 254)",
    },
    logoutButton: {
        fontFamily: "Helvetica",
        fontSize: 14
    },
})