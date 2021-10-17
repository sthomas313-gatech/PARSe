import React from 'react';
import { 
  View, 
  StyleSheet, 
  Button,
  Text
  } from 'react-native';

export default function NavBar({navigation}) {
  return (
    <View style={styles.navBarStyle} >
        <View style={styles.buttonView} >
            <Button
                style={styles.loginButton}
                title="Feed"
                onPress={() => navigation.navigate("LoginScreen")}
            />
        </View>
        <View style={styles.buttonView} >
            <Button
                style={styles.loginButton}
                title="Discover"
                onPress={() => navigation.navigate("LoginScreen")}
            />
        </View>
        <View style={styles.buttonView} >
            <Button
                style={styles.loginButton}
                title="Profile"
                onPress={() => navigation.navigate("LoginScreen")}
            />
        </View>
    </View>
    
    // <Button
    //             style={styles.loginButton}
    //             title="Profile"
    //             onPress={() => navigation.navigate("LoginScreen")}
    // />
    // <View style={styles.navBarStyle}>
    //     <View style={styles.buttonView}>
    //         <Text>Hello</Text>
    //         <Button
    //             style={styles.loginButton}
    //             title="Feed"
    //             onPress={() => navigation.navigate("LoginScreen")}
    //         />
    //     </View>
    //     <View style={styles.buttonView}>
    //         <Button
    //             style={styles.loginButton}
    //             title="Discover"
    //             onPress={() => navigation.navigate("LoginScreen")}
    //         />
    //     </View>
        
    //     <View style={styles.buttonView}>
    //         <Text>Hellow!</Text>
    //     </View>
    // </View>
    
  );
}

const styles = StyleSheet.create({
    navBarStyle: {
        paddingTop: 10,
        marginBottom: 0,
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "black"
    },
    buttonView: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 5
    },
    // buttonView: {
    //     // borderRadius: 10,
    //     // backgroundColor: "rgb(199, 147, 85)",
    //     // backgroundColor: "white",
    //     padding: 20,
    //     margin: 10,
    //     flex: 1
    // },
    loginButton: {
        fontFamily: "Helvetica",
        fontSize: 14,
        color: "white",
        backgroundColor: "red"
    },
});
