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
import {useContext} from 'react';
import  * as firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

import Icon from 'react-native-vector-icons/FontAwesome';
// import googleSignIn from "../images/google_signin_buttons/ios/2x/btn_google_light_normal_ios@2x.png";

import Header from './Header';
import {AuthContext} from './FacebookComponent';

export default class LoginScreen extends React.Component  {
    state = {
        email: "",
        password: "",
        errorMessage: null
    };
    handleLogin = () => {
        const {email, password} = this.state
        firebase.default
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({errorMessage: error.message}))
    }
    componentDidMount() {
    }

    // handleFacebook = () => {
    //     useContext(AuthContext);
    //     //Alert.alert('login with facebook');
    // }
    render() {
        return (
            <View style={styles.loginView} >
                <SafeAreaView style={styles.loginSafeView}>
                    <Header />
                    <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                    <Text style={styles.textStyle}>Email:</Text>
                    <TextInput 
                        style={styles.inputBox}
                        autoCapitalize="none" 
                        onChangeText={email => this.setState({email})}
                        placeholder="user1234" 
                    />
                    <Text style={styles.textStyle}>Password:</Text>
                    <TextInput 
                        style={styles.inputBox}
                        secureTextEntry={true}
                        autoCapitalize="none" 
                        onChangeText={password => this.setState({password})}
                        placeholder="password" 
                    />
                    
                    <View style={styles.buttonRow} > 
                        <View style={styles.facebookView}>
                            <Icon 
                                style={styles.facebookButton} 
                                name="facebook" 
                                onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))} 
                                //onPress={() => onFacebookButtonPress().then(() => this.props.navigation.navigate("FeedScreen"))}
                                //onPress={() => Alert.alert('login with facebook')}
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
                                //onPress={() => navigation.navigate("FeedScreen")}
                                onPress={this.handleLogin}
                            />
                        </View>
                        <View style = {styles.buttonView}>
                            <Button
                                style = {styles.loginButton}
                                title = "Register"
                                onPress={() => this.props.navigation.navigate("Register")}
                            />
                        </View>
                    </View>
                    
                </SafeAreaView>
            </View>
    
        );
    }
}
async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
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