import * as React from 'react';
import { 
  View, 
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  Button
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
// import googleSignIn from "../images/google_signin_buttons/ios/2x/btn_google_light_normal_ios@2x.png";

import Header from './Header';
import NavBar from './NavBar';
import ProfilePic from './ProfilePic';

// Replace with dynamic content later
import patrick_profile_pic1 from '../images/patrick_profile_pic1.jpeg';


export default function ProfileScreen( {navigation} ) {
    return (
        <SafeAreaView style={styles.loginSafeView}>
            <Header />
            <View style={styles.container} >
                <ProfilePic picture={patrick_profile_pic1} />
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
            </View>
            <NavBar navigation={navigation} />
            
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    loginSafeView: {
        justifyContent: "center",
        flex: 1,
        padding: 8,
        // margin: 18,
        // alignItems: "center"
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
    buttonView: {
        borderRadius: 10,
        backgroundColor: "rgb(199, 147, 85)",
    },
    logoutButton: {
        fontFamily: "Helvetica",
        fontSize: 14
    },
})