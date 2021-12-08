import React, {useContext} from 'react';
import { 
  StyleSheet, SafeAreaView
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
import CreateScreen from './components/CreateScreen';
import CompleteRegistrationScreen from './components/CompleteRegistrationScreen';
import LoggedInLoadingScreen from './components/LoggedInLoadingScreen';
import DetailedRecScreen from './components/DetailedRecScreen';
import RecCard from './components/RecCard';
import SearchScreen from './components/SearchScreen';
import ProfileScreen2 from './components/ProfileScreen2';

//import { firebaseConfig } from './firebaseConfig';

// firebase.initializeApp(firebaseConfig);
const firebaseConfig = 
{
  FIREBASE_APIKEY:'AIzaSyBZTKB2qaGdNI9a5hBOkQdSHJ_Va3MI0Ao',
  FIREBASE_AUTHDOMAIN: 'parse-cs8803mas.firebaseapp.com',
  FIREBASE_PROJECTID:'parse-cs8803mas',
  FIREBASE_STORAGEBUCKET: 'parse-cs8803mas.appspot.com',
  FIREBASE_MESSAGINGSENDERID: '1085239309703',
  FIREBASE_APPID:'1:1085239309703:ios:1b06408a93debff1c48f22',
  // apiKey: 'AIzaSyBZTKB2qaGdNI9a5hBOkQdSHJ_Va3MI0Ao',
  // authDomain: 'parse-cs8803mas.firebaseapp.com',
  // projectId:  'parse-cs8803mas',
  // storageBucket: 'parse-cs8803mas.appspot.com',
  // messagingSenderId: '1085239309703',
  // appId: '1:1085239309703:ios:1b06408a93debff1c48f22',
  persistence: true
}

// navigation manager -- https://reactnative.dev/docs/navigation
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const FeedStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const LoggedIn = createNativeStackNavigator();
const Discover = createNativeStackNavigator();
const Profile = createNativeStackNavigator();




const authStack = () => (
  <NavigationContainer>
    <AuthStack.Navigator initialRouteName = "Login">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  </NavigationContainer>
)

function feedStack() {
  return (
    <FeedStack.Navigator initialRouteName = "FeedScreen" screenOptions={{
      headerShown: false
    }} >
        <FeedStack.Screen name="FeedScreen" component={FeedScreen} />
        <FeedStack.Screen name="CreateScreen" component={CreateScreen} />
        <FeedStack.Screen name="DetailedRecScreen" component={DetailedRecScreen}/>
    </FeedStack.Navigator>
  )
}

const loggedInStack = () => (
 <NavigationContainer> 
    <LoggedIn.Navigator initialRouteName = "LoggedInloading" screenOptions={{
      headerShown: false,
    }}>
      <LoggedIn.Screen name="NavBar" component={NavBar} />
      <LoggedIn.Screen name="LoggedInloading" component={LoggedInLoadingScreen} />
      <LoggedIn.Screen name="CompleteRegistration" component={CompleteRegistrationScreen} />
   </LoggedIn.Navigator> 
 </NavigationContainer>
)

function discoverStack () {
  return (
    <Discover.Navigator initialRouteName = "DiscoverScreen" screenOptions={{
      headerShown: false,
    }}>
      <Discover.Screen name="DiscoverScreen" component={DiscoverScreen} />
      <Discover.Screen name="DetailedRecScreen" component={DetailedRecScreen}/>
   </Discover.Navigator> 
 )
}

function profileStack () {
  return (
    <Profile.Navigator initialRouteName = "ProfileScreen" screenOptions={{
      headerShown: false,
    }}>
      <Profile.Screen name="ProfileScreen" component={ProfileScreen} />
      <Profile.Screen name="DetailedRecScreen" component={DetailedRecScreen}/>
   </Profile.Navigator> 
 )
}

// to do come back to nav bar and nav container
function NavBar() {
  return (
      <Tab.Navigator initialRouteName = "Feed" screenOptions={{
      headerShown: false
    }}>
        <Tab.Screen 
            name="Feed"
            component={feedStack}
          />
        <Tab.Screen 
            name="Search"
            component={SearchScreen}
          />
        <Tab.Screen 
            name="Discover"
            component={discoverStack}
          />
        <Tab.Screen 
            name="Profile"
            component={profileStack}
          />  
      </Tab.Navigator>
  )
}


  export default createAppContainer(
    createSwitchNavigator(
      {
        Loading: LoadingScreen,
        App: loggedInStack,
        Auth: authStack,
      },
      {
        initialRouteName: "Loading"
      }
    )
  )