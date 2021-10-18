import React from 'react';
import { 
  View, 
  StyleSheet, 
  Button,
  Text,
//   Pressable,
  TouchableOpacity
  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NavBar({navigation}) {
  return (
    <View style={styles.navBarStyle} >
        <TouchableOpacity
            onPress={() => navigation.navigate("FeedScreen")}
            style={styles.pressableStyle}
        >
            <MaterialCommunityIcons 
                style={styles.icon} 
                name="script" 
            />
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate("DiscoverScreen")}
            style={styles.pressableStyle}
        >
                <MaterialCommunityIcons 
                    style={styles.icon} 
                    name="magnify" 
                />
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
            style={styles.pressableStyle}
        >
            <MaterialCommunityIcons 
                style={styles.icon} 
                name="account" 
            />
        </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
    navBarStyle: {
        // paddingTop: 10,
        marginBottom: 0,
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        // borderTopWidth: 1,
        // borderTopColor: "black"
    },
    pressableStyle: {
        borderWidth: 1,
        // borderRadius: 10,
        padding: 5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
        // fontSize: 40
    },
    buttonView: {
        borderWidth: 1,
        // borderRadius: 10,
        padding: 5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
        // fontSize: 40
    },
    leftButtonView: {
        borderLeftWidth: 0
    },
    rightButtonView: {
        borderRightWidth: 0
    },
    // buttonStyle: {
    //     fontFamily: "Helvetica",
    //     fontSize: 14,
    //     color: "white",
    //     backgroundColor: "red"
    // },
    icon: {
        fontSize: 40
    }
});
