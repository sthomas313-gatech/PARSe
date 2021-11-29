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
import { getCurrentUser } from '../auth';
import { populateSearchUsersCurrentUserStatuses } from '../friends';
import { searchUsers } from '../user';

import Header from './Header';
import UserCard from './UserCard';


export default function SearchScreen( {navigation} ) {

    const [currentUser, setCurrentUser] = React.useState(() => {
        return getCurrentUser();
    });
    const [userList, setUserList] = React.useState([]);
    const [userCardList, setUserCardList] = React.useState([]);
    const [restaurantList, setRestaurantList] = React.useState([]);
    const [restaurantCardList, setRestaurantCardList] = React.useState([]);

    React.useEffect( () => {
        var tempUserCards = [];
        userList.forEach((user) => {
            if (user.id == currentUser.id) {
                tempUserCards.push(<UserCard key={user.id} userInfo={user} />);
            } else if (user.friendStatus == true) {
                tempUserCards.push(<UserCard key={user.id} userInfo={user} unfollow={true} />);
            } else if (user.friendRequestStatus.requestOut) {
                tempUserCards.push(<UserCard key={user.id} userInfo={user} cancelRequest={true} />);
            } else {
                tempUserCards.push(<UserCard key={user.id} userInfo={user} follow={true} />);
            }
            
        });
        setUserCardList(tempUserCards);
    }, [userList]);



    const handleSearch = (searchStr) => {
        populateSearchUsersCurrentUserStatuses(searchStr).then((result) => {
            console.log(JSON.stringify(result, undefined, 2));
            setUserList(result);
        });
    };


    return (
        <SafeAreaView style={styles.loginSafeView}>
            <Header />
            <View style={styles.searchBarStyle} >
                <Text style={styles.textStyle}>Search:</Text>
                <TextInput 
                    style={styles.inputBox}
                    autoCapitalize="none" 
                    onChangeText={searchStr => handleSearch(searchStr)}
                    placeholder="search string" 
                />
            </View>
            <ScrollView style={styles.container} >

                <View style={styles.row}>
                    <Text style={styles.text}>Users</Text>
                </View>
                <View>
                    {userCardList}
                    {/* <Button title="Load More" onPress={() => console.log("not functional yet!") } /> */}
                </View>


                <View style={styles.row}>
                    <Text style={styles.text}>Restaurants</Text>
                </View>
                <View>
                    {restaurantCardList}
                    <Button title="Load More" onPress={() => console.log("not functional yet!") } />
                </View>
                
                
                <View style={styles.space}>
                    <Text></Text>
                </View>
            </ScrollView>
            {/* <NavBar navigation={navigation} /> */}
            
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
    searchBarStyle: {
        // flex: 1,
        padding: 10,
        marginLeft: 18,
        marginRight: 18,
        marginTop: 0,
        paddingBottom: 0
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
    inputBox: {
        height: 40,
        marginBottom: 12,
        marginTop: 2,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgb(250,250,250)"
    },
    textStyle: {
        fontFamily: "Helvetica",
    },
})