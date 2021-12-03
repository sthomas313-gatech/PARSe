import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
//import * as firebase from '@firebase/app'
import * as firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
//import '@firebase/auth'


export default class RegisterScreen extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    };

    handleSignUp = () => {
        firebase.default
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        // .then(userCredentials => {
        //     return userCredentials.user.updateProfile({
        //         displayName: this.state.name
        //     })
        // })
        .catch(error => this.setState({errorMessage: error.message}))
    }

    goBack = () => (
        this.props.navigation.goBack()
    )
    
    render() {
        return <View style={styles.container}> 
            <Text style={styles.greeting}> {'Signup to get started.'} </Text>
            <View style={styles.errorMessage}>
                {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
            </View>
            <View style={styles.form}>
                {/* <View> 
                    <Text style={styles.inputTitle}>Full Name</Text>
                    <TextInput style={styles.input} autoCapitalize="none" onChangeText={name=> this.setState({name})} 
                    value = {this.state.name}></TextInput>
                    
                </View> */}
                <View style={{marginTop: 32}}> 
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput style={styles.input} autoCapitalize="none" onChangeText={email => this.setState({email})} 
                    value = {this.state.email}></TextInput>
                    
                </View>
                <View style={{marginTop: 32}}>  
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry={true} autoCapitalize="none" 
                    onChangeText={password => this.setState({password})}
                    value = {this.state.password}></TextInput>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                <Text style={{fontWeight: "600"}}>Sign up</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={this.goBack}>
                <Text style={{fontWeight: "600"}}>Return</Text>
            </TouchableOpacity> */}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        fontWeight: "600",
        fontSize: 13,
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#ebab3d",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
    
})