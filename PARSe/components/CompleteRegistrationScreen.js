import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  View,
  LogBox,
  Button,
  TouchableOpacity
} from 'react-native';
// import { Button } from 'react-native-paper';
import Header from './Header';
import { checkUsernameAvailability, createCurrentUserDoc } from '../user';


export default function CompleteRegistrationScreen({navigation}) {
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [username, setUsername] = React.useState("");
    const [usernameAvailable, setUsernameAvailable] = React.useState();
    const [usernameLengthRequirement, setUsernameLengthRequirement] = React.useState(false);

    React.useEffect( () => {
        checkUsernameAvailability(username).then((result) => {
            if (result == true) {
                setUsernameAvailable(true);
            } else if (result == false) {
                setUsernameAvailable(false);
            }
        });

        if (username.length <= 3) {
            setUsernameLengthRequirement(false);
        } else {
            setUsernameLengthRequirement(true);
        }
    }, [username]);



    const handleSubmit = () => {
        console.log(`handle submit: `);
        console.log(`firstName: ${firstName}, lastName: ${lastName}, username: ${username}, usernameAvailable: ${usernameAvailable}`);
        console.log(`expression: ${(usernameAvailable) && (lastName) && (firstName) && (username)}`);
        if ((usernameAvailable) && (lastName) && (firstName) && (username)) {
            const userUpdates = {lastName: lastName, firstName: firstName, username: username};
            createCurrentUserDoc(userUpdates).then(() => {
                console.log(`created user!`);
                navigation.navigate("NavBar");
            })
            .catch((error) => {
                console.log(`error updating user ${error}`)
            });
        }
        
    };


    return (
        <SafeAreaView style={styles.container}>
            <Header text={"Registration"} />
            <View style={styles.bodyView}>
                <Text style={styles.textStyle}>First Name:</Text>
                <TextInput 
                    style={styles.inputBox}
                    autoCapitalize="none" 
                    onChangeText={name => setFirstName(name)}
                    placeholder="" 
                    value={firstName}
                />
                <Text style={styles.textStyle}>Last Name:</Text>
                <TextInput 
                    style={styles.inputBox}
                    autoCapitalize="none" 
                    onChangeText={name => setLastName(name)}
                    placeholder="" 
                    value={lastName}
                />
                <View style={styles.row} >
                    <Text style={styles.textStyle}>Username:</Text>
                    { (!usernameLengthRequirement) 
                    ?
                    <Text style={styles.unavailableTextStyle}>username not long enough :(</Text>
                    :
                    (usernameAvailable) 
                    ? 
                    <Text style={styles.availableTextStyle}>username available :)</Text>
                    :
                    <Text style={styles.unavailableTextStyle}>username unavailable :(</Text>
                    }
                </View>
                <TextInput 
                    style={styles.inputBox}
                    autoCapitalize="none" 
                    onChangeText={u => setUsername(u)}
                    placeholder="" 
                    value={username}
                />
                <Button title="next" onPress={() => navigation.navigate("NavBar") } ></Button>
                <Button title="Submit" onPress={handleSubmit} disabled={!usernameAvailable || !usernameLengthRequirement} ></Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bodyView: {
        padding: 10,
        margin: 18,
        marginTop: 0
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textStyle: {
        fontFamily: "Helvetica",
    },
    availableTextStyle: {
        fontFamily: "Helvetica",
        color: "green"
    },
    unavailableTextStyle: {
        fontFamily: "Helvetica",
        color: "red"
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
});