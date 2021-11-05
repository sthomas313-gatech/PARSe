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

import { getCurrentUserFriends } from '../friends/getCurrentUserFriends';
import { getCurrentUserInfo } from '../user/getCurrentUserInfo';
import { getCurrentUserFriendRecs } from '../recs/getCurrentUserFriendRecs';



export default function FeedScreen( {navigation} ) {
  
  const [db_recs, setDb_recs] = useState(null);

  /* create list of RecCard elements */
  var recCardsList = [];
  for (var i=0; i < recs.length; i++) {
    recCardsList.push(<RecCard key={recs[i].restaurant.name.concat(recs[i].user.username)} rec={recs[i]} />);
  }

  /* Get Firestore Data */
  React.useEffect( () => {
    get_recs().then(rec => {
      console.log(`useEffect getting recs: ${JSON.stringify(rec)}`)
      setDb_recs(JSON.stringify(rec));
    })
  }, []);

  React.useEffect( () => {
    getCurrentUserInfo().then(userInfo => {
      console.log(`useEffect get current user info: ${JSON.stringify(userInfo)}`);
    })
  }, []);

  React.useEffect( () => {
    getCurrentUserFriends().then(friends => {
      console.log(`useEffect get current user friends: ${JSON.stringify(friends)}`)
    })
  }, []);

  // TODO: fix getCurrentUserFriendRecs
  React.useEffect( async () => {
    getCurrentUserFriendRecs().then(currentUserFriendRecs => {
      console.log(`current user friend recs: ${JSON.stringify(currentUserFriendRecs)}`);
    })
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView>
            {recCardsList}
            <Text>{db_recs}</Text>
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
