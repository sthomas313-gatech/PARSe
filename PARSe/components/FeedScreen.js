import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text
} from 'react-native';
import { Button } from 'react-native-paper';

// custom components
import Header from './Header';
import RecCard from './RecCard';
import NavBar from './NavBar';

// import static content (replace with dynamic content from backend later)
import { recs } from "../static_content";

// firestore
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

const get_recs = async () => {
  try {
    const result = await firebase.firestore().collection("recs").doc("recID1").get();
    const rec_comment = result.data();
    return rec_comment;
  } catch (e) {
    throw new Error("error in get_recs function");
  }
}

import { getCurrentUserFriendRecs } from '../recs/getCurrentUserFriendRecs';



export default function FeedScreen( {navigation} ) {

  const [recCardsList, setRecCardsList] = useState(null);

  // Populate recCardsList based on currently logged in user's friends' recommendations
  React.useEffect( () => {
    getCurrentUserFriendRecs()
      .then(currentUserFriendRecs => {
        var recCardsList = [];
        for (var i=0; i < currentUserFriendRecs.length; i++) {
          recCardsList.push(<RecCard key={currentUserFriendRecs[i].restaurant.name.concat(currentUserFriendRecs[i].user.username)} rec={currentUserFriendRecs[i]} />);
        }
        setRecCardsList(recCardsList);
        console.log(`current user friend recs: ${JSON.stringify(currentUserFriendRecs)}`);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView>
            {recCardsList}
        </ScrollView>
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
