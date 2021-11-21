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


// Firestore data
import { getCurrentUserRecs } from '../recs';
import { getCurrentTimestamp } from '../time';
import { getCurrentUserInfo } from '../user';
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'


export default function ProfileScreen( {navigation} ) {

    const [recCardsList, setRecCardsList] = React.useState([]);
    const [recsList, setRecsList] = React.useState([]);
    const [lastRefresh, setLastRefresh] = React.useState(null);
    const [userInfo, setUserInfo] = React.useState(null);


    const updateRecCardsList = () => {
        getCurrentUserRecs().then((result) => {
            const [recs, lastDoc] = result;
            var tempRecCardsList = []
            var tempRecsList = []
            recs.forEach((rec) => {
                tempRecsList.push(rec);
                tempRecCardsList.push(<RecCard key={rec.restaurant.name.concat(rec.user.username)} rec={rec} editView={true} />)
              });
            
            setRecCardsList(tempRecCardsList);
            setRecsList(tempRecsList);
            setLastRefresh(getCurrentTimestamp());
        })
        .catch((error) => {
            throw new Error(error.message);
        });
    }

    // set
    React.useEffect( () => {
        updateRecCardsList();
        getCurrentUserInfo().then((result) => {
            setUserInfo(result);
            console.log(`${JSON.stringify(result)}`);
        })
    }, []);

    // React.useEffect( () => {
    //     const subscriber = firebase.firestore()
    //         .collection('userRecs')
    //         .doc(userInfo && "id" in userInfo && userInfo.id)
    //         .onSnapshot(documentSnapshot => {
    //             console.log('User data: ', documentSnapshot.data());
    //         });

    //     // Stop listening for updates when no longer required
    //     return () => subscriber();
    // }, []);
    


    return (
        <SafeAreaView style={styles.loginSafeView}>
            <Header />
            <ScrollView style={styles.container} >
                <View style={styles.userInfoView}>
                    <ProfilePic pictureURL={userInfo && userInfo.profilePicture} />
                    <View style={styles.userInfoView}>
                        <Text style={styles.nameStyle}>{userInfo && `${userInfo.firstName} ${userInfo.lastName}`}</Text>
                        <Text style={styles.userNameStyle}>@{userInfo && `${userInfo.username}`}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.text}>My Top Recs</Text>
                    <Button title="Edit" />
                </View>
                <View>
                    {recCardsList}
                    <Button title="Add" onPress={() => navigation.navigate("CreateScreen") } />
                </View>

                <View style={styles.row}>
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
                </View>
                

                <TextInput style={styles.inputBox} />
                <TextInput style={styles.inputBox} />
                <TextInput style={styles.inputBox} />
                <View
                    style={styles.buttonView}
                >
                    <Button 
                        title="Log Out" 
                        style={styles.logoutButton}
                        onPress={() => navigation.navigate("LoginScreen")} 
                    />
                </View>
                <View style={styles.space}>
                    <Text></Text>
                </View>
            </ScrollView>
            <NavBar navigation={navigation} />
            
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
        backgroundColor: "rgb(199, 147, 85)",
    },
    logoutButton: {
        fontFamily: "Helvetica",
        fontSize: 14
    },
})