import React, { useState } from 'react';
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

// firestore
import firestore from '@react-native-firebase/firestore';

async function get_recs() {
  const recs_db = firestore().collection("recs");
  const rec = await recs_db.doc("recID1").get();
  return rec;
}



export default function FeedScreen( {navigation} ) {
  
  const [db_recs, setDb_recs] = useState("");

  /* create list of RecCard elements */
  var recCardsList = [];
  for (var i=0; i < recs.length; i++) {
    recCardsList.push(<RecCard key={recs[i].restaurant.name.concat(recs[i].user.username)} rec={recs[i]} />);
  }

  /* Get Firestore Data */
  // const rec = get_recs();
  // setDb_recs(JSON.stringify(rec));

  return (
    <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView>
            {recCardsList}
            {/* <Text>{db_recs}</Text> */}
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
