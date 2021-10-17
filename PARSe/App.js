import React from 'react';
import { 
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// navigation manager -- https://reactnative.dev/docs/navigation
const Stack = createNativeStackNavigator();

// custom components
import LoginScreen from './components/LoginScreen';
import FeedScreen from './components/FeedScreen';
import Header2 from './components/Header2';
import DiscoverScreen from './components/DiscoverScreen';


export default function App() {

  return (
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
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: 'Login' }}
            options={{ headerTitle: (props) => <Header2 {...props} /> }}
          />
        <Stack.Screen 
            name="FeedScreen"
            component={FeedScreen}
            // options={{ title: "Recommendation Feed"}}
            options={{ headerTitle: (props) => <Header2 {...props} /> }}
          />
        <Stack.Screen 
            name="DiscoverScreen"
            component={DiscoverScreen}
            // options={{ title: "Recommendation Feed"}}
            options={{ headerTitle: (props) => <Header2 {...props} /> }}
          />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  navContainer: {
    margin: 0,
    padding: 0
  }
});
