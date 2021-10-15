import * as React from 'react';
import { 
  View, 
  StyleSheet,
  ScrollView
} from 'react-native';
// import Constants from 'expo-constants';


// custom components
import {Header} from './components/Header';
import {RecCard2} from './components/RecCard2';

// hard-coded profile pictures
import allison_profile_pic1 from './images/allison_profile_pic1.png';
import patrick_profile_pic1 from './images/patrick_profile_pic1.jpeg';
import ria_profile_pic1 from './images/ria_profile_pic1.png';

// hard-coded recommendations
const rec1 = {
  restaurant: {
    name: "Taqueria Del Sol",
    location: {
      city: "Atlanta",
      state: "GA"
    }
  },
  user: {
    username: "patrickc410",
    picture: patrick_profile_pic1,
    firstName: "Patrick",
    lastName: "Crawford"
  },
  title: "So Good!",
  comments: "I love their cheese dip, it's the best in town. And they always have great specials -- my favorites being the cheeseburger taco and the carnitas tostadas",
  tags: [
    "Fast", "Cheap", "Tex-Mex"
  ]
};
const rec2 = {
  restaurant: {
    name: "Papi's Cuban Grill",
    location: {
      city: "Atlanta",
      state: "GA"
    }
  },
  user: {
    username: "nothisisria",
    picture: ria_profile_pic1,
    firstName: "Ria",
    lastName: "Mitra"
  },
  title: "Best meal ever!",
  comments: "Okay so this was literally such a good meal I'm obsessed",
  tags: [
    "Gluten-free", "Bike-safe"
  ]
};
const rec3 = {
  restaurant: {
    name: "Wagaya",
    location: {
      city: "Houston",
      state: "TX"
    }
  },
  user: {
    username: "ronanempire",
    picture: allison_profile_pic1,
    firstName: "Allison",
    lastName: "Ronan"
  },
  title: "No better ramen",
  comments: "The noodles? the broth? the perfectly cooked egg? unmatched",
  tags: [
    "Kid-friendly"
  ]
};



export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <RecCard2 rec={rec1} />
        <RecCard2 rec={rec2} />
        <RecCard2 rec={rec3} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
