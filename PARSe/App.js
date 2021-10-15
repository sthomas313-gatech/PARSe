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


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
        <Stack.Screen 
            name="FeedScreen"
            component={FeedScreen}
            options={{ title: "Recommendation Feed"}}
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
});
