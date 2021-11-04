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
import firestore from '@react-native-firebase/firestore';

async function get_recs() {
  // const rec_col = await firestore().collection("recs").get();
  // console.log(`read collection recs from firestore: ${JSON.stringify(rec_col)}`)
  const rec_comment = await firestore().doc("recs/recID1/comments").get();
  console.log(`read recID1 comment from firestore: ${JSON.stringify(rec_comment)}`);
  const rec = await firestore().collection("recs").doc("recID1").get();
  console.log(`read recID1 from firestore: ${JSON.stringify(rec)}`)
  return rec;
}



export default function FeedScreen( {navigation} ) {
  
  const [db_recs, setDb_recs] = useState("");

  /* create list of RecCard elements */
  var recCardsList = [];
  for (var i=0; i < recs.length; i++) {
    recCardsList.push(<RecCard key={recs[i].restaurant.name.concat(recs[i].user.username)} rec={recs[i]} />);
  }

  React.useEffect(() => {
    /* Get Firestore Data */
    // get_recs().then( (rec) => {
    //   console.log(`back in useEffect: ${JSON.stringify(rec)}`);
    //   setDb_recs(JSON.stringify(rec));
    // })
  }, []);
  

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
