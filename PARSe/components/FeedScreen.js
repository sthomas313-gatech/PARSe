import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  RefreshControl,
  Button
} from 'react-native';
// import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

// custom components
import Header from './Header';
import RecCard from './RecCard';
import NavBar from './NavBar';

// firestore
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import { getCurrentUserAndFriendRecs } from "../recs";
import { getCurrentTimestamp } from '../time';
import AddRecButton from './AddRecButton';



export default function FeedScreen( {navigation} ) {

  const isFocused = useIsFocused();

  const [recCardsList, setRecCardsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [recsList, setRecsList] = useState([]);
  const [lastRec, setLastRec] = useState(null);
  const [noMoreRecs, setNoMoreRecs] = useState(false);

  const updateRecCardsList = async (minRefreshTime=0, startAfter=null, overWrite=true) => {

      var skipRefresh = false;
      if (lastRefresh) {
        if (getCurrentTimestamp().seconds - lastRefresh.seconds < minRefreshTime) {
          skipRefresh = true;
        }
      }

      if (skipRefresh) {
        console.log(`skipping refresh, only been ${(getCurrentTimestamp().seconds - lastRefresh.seconds).toFixed(1)} seconds`);
        return;
      }

      console.log(`refreshing recCardsList`);

      getCurrentUserAndFriendRecs(limit=5, orderBy={field: "created", direction: "desc"}, startAfter=startAfter)
        .then((result) => {
          const [recs, lastDoc] = result;
          // console.log(recs);

          if (recs.length == 0) {
            setNoMoreRecs(true);
            return;
          } else if (recs.length > 0) {
            setNoMoreRecs(false);
          }

          var tempRecsList = [];
          var tempRecCardsList = [];
          if (!overWrite) {
            tempRecsList = [...recsList];
            tempRecCardsList = [...recCardsList];
          }
            
          recs.forEach((rec) => {
            tempRecsList.push(rec);
            tempRecCardsList.push(<RecCard key={rec.id} rec={rec} />)
          });

          setRecsList(tempRecsList);
          setRecCardsList(tempRecCardsList);

          setLastRec(lastDoc);

          setLastRefresh(getCurrentTimestamp());

        })
        .catch((error) => {
          throw new Error(error.message);
        });
  }
  
  // Populate recCardsList on initial load, based on currently logged in user's friends' recommendations
  React.useEffect( () => {
    setRefreshing(true);
    updateRecCardsList(minRefreshTime=0, startAfter=null, overWrite=true).then(() => {
      setRefreshing(false);
    });
  }, [isFocused]);

  // On refresh, update recCardsList
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      updateRecCardsList(minRefreshTime=5, startAfter=null, overWrite=true).then(() => {
        setRefreshing(false);
      });
  }, []);

  const loadMore = () => {
      // let startAfter = {userID: lastRec.userID, title: lastRec.title, restaurantID: lastRec.restaurantID, created: lastRec.created};
      updateRecCardsList(minRefreshTime=0, startAfter=lastRec, overWrite=false);
  };
  

  return (
    <SafeAreaView style={styles.container}>
        <Header navigation={navigation} topLeftElement={<AddRecButton navigation={navigation} />} />
        <ScrollView 
          contentContainerStyle={styles.scrollViewStyle}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
            {recCardsList}
            {noMoreRecs && <Text style={styles.noMoreRecsStyle} >No more recommendations to load! :(</Text>}
            {!refreshing && <Button 
              style={styles.loadMoreButton} 
              title="Load More Recommendations" 
              onPress={loadMore}
            />}
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
  scrollViewStyle: {
    paddingBottom: 100,
    // marginBottom: 200
  },
  loadMoreButton: {
    marginTop: 20,
  },
  noMoreRecsStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  }
});
