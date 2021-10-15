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

import Header from './Header';


export default function LoginScreen() {
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
                    <Icon.Button 
                        style={styles.facebookButton} 
                        name="facebook" 
                        onPress={() => Alert.alert('login with facebook')} 
                    />
                    <Icon.Button name="google" onPress={() => Alert.alert('login with google')} />
                    <View style={styles.buttonView}>
                        <Button
                            style={styles.loginButton}
                            title="Login"
                            onPress={() => Alert.alert('login with email/username')}
                        />
                    </View>
                </View>
                
            </SafeAreaView>
        </View>

    );
}

styles = StyleSheet.create({
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
        borderRadius: 100
    }
})