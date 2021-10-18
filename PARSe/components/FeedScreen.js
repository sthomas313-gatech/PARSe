import React from 'react';
import { 
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Button } from 'react-native-paper';

// custom components
import Header from './Header';
import RecCard from './RecCard';
import NavBar from './NavBar';

// import static content (replace with dynamic content from backend later)
import { recs } from "../static_content";


export default function FeedScreen( {navigation} ) {

  // build array of RecCard components
  var recCardsList = [];
  for (var i=0; i < recs.length; i++) {
    recCardsList.push(<RecCard key={recs[i].restaurant.name.concat(recs[i].user.username)} rec={recs[i]} />);
  }

  return (
    <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView>
            {recCardsList}
        </ScrollView>
        {/* <Button title="Login" onPress={() => navigation.navigate("LoginScreen")} /> */}
        <NavBar navigation={navigation} />
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
