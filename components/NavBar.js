import React from 'react';
import { 
  View, 
  StyleSheet, 
  Button,
  Text,
//   Pressable,
  TouchableOpacity,
  Dimensions
  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

export default function NavBar({navigation}) {
  return (
    <LinearGradient 
            style={styles.linGradStyle}
            colors={["rgb(255, 255, 255)", "rgb(239, 187, 125)"]}
        >
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
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
    linGradStyle: {
        position: "absolute",
        top: 10*Dimensions.get("window").height/11,
        marginBottom: 0,
        opacity: 0.75,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "rgb(239, 187, 125)"
    },
    navBarStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        // flex: 1
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
    icon: {
        fontSize: 40
    }
});
