import React from 'react';
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
// navigation manager -- https://reactnative.dev/docs/navigation
const Stack = createNativeStackNavigator();

// custom components
import LoginScreen from './components/LoginScreen';
import FeedScreen from './components/FeedScreen';
//import Header2 from './components/Header2';
import DiscoverScreen from './components/DiscoverScreen';
import ProfileScreen from './components/ProfileScreen';
import RegisterScreen from './components/RegisterScreen';
import LoadingScreen from './components/LoadingScreen';

const firebaseConfig = 
{
  FIREBASE_APIKEY:'AIzaSyBZTKB2qaGdNI9a5hBOkQdSHJ_Va3MI0Ao',
  FIREBASE_AUTHDOMAIN: 'parse-cs8803mas.firebaseapp.com',
  FIREBASE_PROJECTID:'parse-cs8803mas',
  FIREBASE_STORAGEBUCKET: 'parse-cs8803mas.appspot.com',
  FIREBASE_MESSAGINGSENDERID: '1085239309703',
  FIREBASE_APPID:'1:1085239309703:ios:1b06408a93debff1c48f22'
  // apiKey: 'AIzaSyBZTKB2qaGdNI9a5hBOkQdSHJ_Va3MI0Ao',
  // authDomain: 'parse-cs8803mas.firebaseapp.com',
  // projectId:  'parse-cs8803mas',
  // storageBucket: 'parse-cs8803mas.appspot.com',
  // messagingSenderId: '1085239309703',
  // appId: '1:1085239309703:ios:1b06408a93debff1c48f22'
}

firebase.initializeApp(firebaseConfig);

const AuthStack = createNativeStackNavigator();

const authStack = () => (
  <NavigationContainer>
    <AuthStack.Navigator initialRouteName = "Login">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  </NavigationContainer>
)

const allStacks = () => (
    <NavigationContainer initialRouteName = "FeedScreen">
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
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            // options={{ title: 'Login' }}
            // options={{ headerTitle: (props) => <Header2 {...props} /> }}
          />
        <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
        />
        <Stack.Screen 
            name="FeedScreen"
            component={FeedScreen}
            // options={{ title: "Recommendation Feed"}}
            // options={{ headerTitle: (props) => <Header2 {...props} /> }}
          />
        <Stack.Screen 
            name="DiscoverScreen"
            component={DiscoverScreen}
            // options={{ title: "Recommendation Feed"}}
            // options={{ headerTitle: (props) => <Header2 {...props} /> }}
          />
        <Stack.Screen 
            name="ProfileScreen"
            component={ProfileScreen}
            // options={{ title: "Recommendation Feed"}}
            // options={{ headerTitle: (props) => <Header2 {...props} /> }}
          />   
      </Stack.Navigator>
    </NavigationContainer>
    
  )

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: allStacks,
      Auth: authStack,
    },
    {
      initialRouteName: "Loading"
    }
  )
)
// export default function App() {

//   return (
//     <NavigationContainer>
//       <Stack.Navigator 
//         screenOptions={{
//           headerShown: false,
//           headerStyle: {
//             backgroundColor: 'rgb(239, 187, 125)',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//         >
//         <Stack.Screen
//             name="LoginScreen"
//             component={LoginScreen}
//             // options={{ title: 'Login' }}
//             // options={{ headerTitle: (props) => <Header2 {...props} /> }}
//           />
//         <Stack.Screen
//             name="RegisterScreen"
//             component={RegisterScreen}
//         />
//         <Stack.Screen 
//             name="FeedScreen"
//             component={FeedScreen}
//             // options={{ title: "Recommendation Feed"}}
//             // options={{ headerTitle: (props) => <Header2 {...props} /> }}
//           />
//         <Stack.Screen 
//             name="DiscoverScreen"
//             component={DiscoverScreen}
//             // options={{ title: "Recommendation Feed"}}
//             // options={{ headerTitle: (props) => <Header2 {...props} /> }}
//           />
//         <Stack.Screen 
//             name="ProfileScreen"
//             component={ProfileScreen}
//             // options={{ title: "Recommendation Feed"}}
//             // options={{ headerTitle: (props) => <Header2 {...props} /> }}
//           />   
//       </Stack.Navigator>
//     </NavigationContainer>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   navContainer: {
//     margin: 0,
//     padding: 0
//   }
// });
