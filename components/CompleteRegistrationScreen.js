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
  TouchableOpacity,
  Alert
} from 'react-native';
// import { Button } from 'react-native-paper';
import Header from './Header';
import { checkUsernameAvailability, createCurrentUserDoc } from '../user';


export default function CompleteRegistrationScreen({navigation}) {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [usernameAvailable, setUsernameAvailable] = React.useState(false);
    const [usernameLengthRequirement, setUsernameLengthRequirement] = React.useState(false);
    const [submitErrorMessage, setSubmitErrorMessage] = React.useState("");
    const [usernameValidChars, setUsernameValidChars] = React.useState(false);

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

        var validChars = /^[0-9a-zA-Z_.]+$/;
        if (username.match(validChars)) {
            // console.log(`validChars for username ${username}: ${true}`);
            setUsernameValidChars(true);
        } else {
            setUsernameValidChars(false);
            // console.log(`validChars for username ${username}: ${false}`);
        }

    }, [username]);


    React.useEffect( () => {
        setSubmitErrorMessage("");
    }, [username, firstName, lastName]);



    const handleSubmit = () => {
        console.log(`handle submit: `);
        console.log(`firstName: ${firstName}, lastName: ${lastName}, username: ${username}, usernameAvailable: ${usernameAvailable}`);
        if (firstName === "" || lastName === "" || username === "") {
            setSubmitErrorMessage("First Name, Last Name, and Username fields cannot be empty");
            return;
        } 
        
        const userUpdates = {lastName: lastName, firstName: firstName, username: username};
        createCurrentUserDoc(userUpdates).then(() => {
            console.log(`created user!`);
            navigation.navigate("NavBar");
        })
        .catch((error) => {
            console.log(`error updating user ${error}`)
        });
        
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
                    (!usernameValidChars)
                    ?
                    <Text style={styles.unavailableTextStyle}>username has invalid characters :(</Text>
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
                {/* <Button title="next" onPress={() => navigation.navigate("NavBar") } ></Button> */}
                <Button title="Submit" onPress={handleSubmit} disabled={!usernameAvailable || !usernameLengthRequirement || !usernameValidChars || submitErrorMessage != ""} ></Button>
                <Text style={styles.unavailableTextStyle} >{submitErrorMessage}</Text>
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