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


export default function LoginScreen( {navigation} ) {
    return (
        <View style={styles.loginView} >
            <SafeAreaView style={styles.loginSafeView}>
                <Header />
                <Text style={styles.textStyle}>Username or Email:</Text>
                <TextInput 
                    style={styles.inputBox}
                    placeholder="user1234" 
                />
                <Text style={styles.textStyle}>Password:</Text>
                <TextInput 
                    style={styles.inputBox}
                    placeholder="strongPassword4" 
                />
                
                <View style={styles.buttonRow} > 
                    <View style={styles.facebookView}>
                        <Icon 
                            style={styles.facebookButton} 
                            name="facebook" 
                            onPress={() => Alert.alert('login with facebook')} 
                        />
                    </View>
                    <View style={styles.facebookView}>
                        {/* <Image source={require("../images/google_signin_buttons/ios/2x/btn_google_light_normal_ios@2x.png")} /> */}
                        <Icon 
                            style={styles.facebookButton}
                            name="google" 
                            onPress={() => Alert.alert('login with google')} />
                    </View>
                    <View style={styles.buttonView}>
                        <Button
                            style={styles.loginButton}
                            title="Login"
                            onPress={() => navigation.navigate("FeedScreen")}
                        />
                    </View>
                </View>
                
            </SafeAreaView>
        </View>

    );
}

const styles = StyleSheet.create({
    loginView: {
        backgroundColor: "rgb(239, 187, 125)",
        flex: 1
    },
    loginSafeView: {
        justifyContent: "center",
        flex: 1,
        padding: 10,
        margin: 18,
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
    textStyle: {
        fontFamily: "Helvetica",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    buttonView: {
        borderRadius: 10,
        backgroundColor: "rgb(199, 147, 85)",
    },
    loginButton: {
        fontFamily: "Helvetica",
        fontSize: 14
    },
    facebookButton: {
        fontSize: 25,
        color: "white"
    },
    facebookView: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        borderWidth: 2,
        padding: 10,
        backgroundColor: "rgb(66,103,178)",
        justifyContent: "center",
        alignItems: "center"
    }
})