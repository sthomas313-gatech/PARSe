import React, { useState } from 'react';
import { 
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'; 
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
import { State } from 'react-native-gesture-handler';

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
  // appId: '1:1085239309703:ios:1b06408a93debff1c48f22'
  persistence: true
}


// navigation manager -- https://reactnative.dev/docs/navigation
const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext();



export default function App() {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const authContext = React.useMemo(
    () => ({
      // Sign-In method
      signIn: async (email, password) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(userCredentials => {
              console.log(`signIn attempt success: ${JSON.stringify(userCredentials)}`);
              dispatch({ type: 'SIGN_IN', token: userCredentials });
          })
          .catch(error => console.log(`signIn error: ${error.code}, ${error.message}`));   
      },

      // Signout method
      signOut: () => dispatch({ type: 'SIGN_OUT' }),

      // signup method
      signUp: async (email, password) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
              console.log(`signUp attempt success: ${userCredentials}`);
              dispatch({ type: 'SIGN_IN', token: userCredentials });
          })
          .catch(error => console.log(`signUp error: ${error.code}, ${error.message}`));   
      },
    }),
    []
  );


  return (
    <AuthContext.Provider value={authContext} >
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'rgb(239, 187, 125)',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {state.userToken ? (
            <>
              <Stack.Screen name="FeedScreen" component={FeedScreen} />
              <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />   
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Loading" component={LoadingScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}