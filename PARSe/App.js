import React from 'react';
import { 
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
// import Constants from 'expo-constants';


// custom components
import Header from './components/Header';
import RecCard from './components/RecCard';

// import static content (replace with dynamic content from backend later)
import {recs } from "./static_content";


export default function App() {

  // build array of RecCard components
  recCardsList = [];
  for (var i=0; i < recs.length; i++) {
    recCardsList.push(<RecCard key={recs[i].restaurant.name.concat(recs[i].user.username)} rec={recs[i]} />);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        {recCardsList}
      </ScrollView>
    </SafeAreaView>
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
