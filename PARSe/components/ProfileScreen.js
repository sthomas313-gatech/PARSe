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
import  * as firebase from '@react-native-firebase/app'
import '@firebase/auth'
import auth from '@react-native-firebase/auth';
// import googleSignIn from "../images/google_signin_buttons/ios/2x/btn_google_light_normal_ios@2x.png";

import Header from './Header';
import NavBar from './NavBar';
import ProfilePic from './ProfilePic';
import RecCard from "./RecCard";


// Replace with dynamic content later
import patrick_profile_pic1 from '../images/patrick_profile_pic1.jpeg';
import {recs} from '../static_content';
// import RecCard from './RecCard';


export default class ProfileScreen extends React.Component {
    state = {
        username: "patrickc410",
        firstName: "Patrick",
        lastName: "Crawford",
        recCardsList: [],
        errorMessage: ""
    }
    componentDidMount() {
        // for (var i=0; i < 1; i++) {
        //     this.state.recCardsList.push(<RecCard key={recs[i].restaurant.name.concat(recs[i].this.state.username)} rec={recs[i]} />);
        // }
    }

    signOutUser = () => {
        firebase.default.auth().signOut().catch(error => this.setState({errorMessage: error.message}))
        console.log("Signed out function");
        console.log(this.state.errorMessage)
    }
    
    render() {
        return (
            <SafeAreaView style={styles.loginSafeView}>
                <Header />
                <ScrollView style={styles.container} >
                    <View style={styles.userInfoView}>
                        <ProfilePic picture={patrick_profile_pic1} />
                        {/* <View style={styles.userInfoView}>
                            <Text style={styles.nameStyle}>{user.firstName} {user.lastName}</Text>
                            <Text style={styles.userNameStyle}>@{user.username}</Text>
                        </View> */}
                         <View style={styles.userInfoView}>
                            <Text style={styles.nameStyle}>{this.state.firstName} {this.state.lastName}</Text>
                            <Text style={styles.userNameStyle}>@{this.state.username}</Text>
                        </View>
                    </View>
    
                    <View style={styles.row}>
                        <Text style={styles.text}>My Top Recs</Text>
                        <Button title="Edit" />
                    </View>
                    <View>
                        {this.state.recCardsList}
                        <Button title="Add" />
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
                            onPress={this.signOutUser} 
                        />
                    </View>
                    <View style={styles.space}>
                        <Text></Text>
                    </View>
                </ScrollView>
                {/* <NavBar navigation={navigation} /> */}
                
            </SafeAreaView>
        );
    }
    
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