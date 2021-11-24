import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import { getCurrentUser } from '../auth'
import { checkUserDocExists } from '../user'



export default function LoggedInLoadingScreen ({ navigation }) {
    React.useEffect( () => {
        const currentUser = getCurrentUser();
        checkUserDocExists(currentUser.id)
            .then((result) => {
                if (result == true) {
                    navigation.navigate("NavBar");
                } else if (result == false) {
                    navigation.navigate("CompleteRegistration");
                } else {
                    console.log(`issue checking user doc exists`);
                }
            })
            .catch((error) => {
                console.log(`error checking user doc exists ${error}`);
            })
    })

    return (<View style={styles.container}> 
        <Text> Loading... </Text>
        <ActivityIndicator size="large"></ActivityIndicator>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center" 
    }
})