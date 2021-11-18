import React, {useContext} from 'react';
import { 
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import {  } from '@react-navigation';

import { FIREBASE_APIKEY,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
  FIREBASE_MESSAGINGSENDERID,
  FIREBASE_APPID} from 'react-native-dotenv'
  import firebase from '@react-native-firebase/app'
  import '@react-native-firebase/auth'


// custom components
import LoginScreen from './components/LoginScreen';
import FeedScreen from './components/FeedScreen';
//import Header2 from './components/Header2';
import DiscoverScreen from './components/DiscoverScreen';
import ProfileScreen from './components/ProfileScreen';
import RegisterScreen from './components/RegisterScreen';
import LoadingScreen from './components/LoadingScreen';

import { firebaseConfig } from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

// navigation manager -- https://reactnative.dev/docs/navigation
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const authStack = () => (
  <NavigationContainer>
    <AuthStack.Navigator initialRouteName = "Login">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  </NavigationContainer>
)

  const NavBar = () => (
    <NavigationContainer>
      <Tab.Navigator initialRouteName = "FeedScreen" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen 
            name="Feed"
            component={FeedScreen}
          />
        <Tab.Screen 
            name="Discover"
            component={DiscoverScreen}
          />
        <Tab.Screen 
            name="Profile"
            component={ProfileScreen}
          />  
      </Tab.Navigator>
    </NavigationContainer>
  )

  export default createAppContainer(
    createSwitchNavigator(
      {
        Loading: LoadingScreen,
        App: NavBar,
        Auth: authStack,
      },
      {
        initialRouteName: "Loading"
      }
    )
  )