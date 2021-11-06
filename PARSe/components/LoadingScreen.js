import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'


export default class LoadingScreen extends React.Component {
    componentDidMount() {
    
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        })
    }
    render() {
        return (<View style={styles.container}> 
            <Text> Loading... </Text>
            <ActivityIndicator size="large"></ActivityIndicator>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center" 
    }
})