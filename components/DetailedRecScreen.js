import React, { useEffect, useState, Children } from 'react';
import { 
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  RefreshControl,
  Button
} from 'react-native';
import { getRec } from "../recs";
import  RecCardTopRow  from "./RecCardTopRow";

// custom components
import Header from './Header';
import RecCard from './RecCard';
import NavBar from './NavBar';

// firestore
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import { getCurrentUserAndFriendRecs } from "../recs";
import { getCurrentTimestamp } from '../time';

export default class DetailedRecScreen extends React.Component {
    state = {
        rec: []
    };
    firestoreRef = firebase.firestore().collection('recs').doc(this.props.route.params.rec);

    componentDidMount() {
        // const db = firebase.firestore();
        // const countRef = db.collection('recs').doc(this.props.route.params.rec);
        // const snapshot = countRef.get();
        // if (snapshot.exists) {
        //     const rec = snapshot.data();
        //     this.state.rec = rec
        //     console.log(rec)
        //     console.log("state:" + this.state.rec.title)
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollectionToolsRental);
    }

    getCollectionToolsRental = (querySnapshot) => {
        console.log("this is the query snapshot:" + querySnapshot)
        console.log(querySnapshot.data())
        const rec = querySnapshot.data()
        this.setState({rec})
        console.log(this.state.rec)
    }
    currentView() {
          return (
            <SafeAreaView>
                <Button 
                title="Go Back" 
                style={styles.goBackButton}
                onPress={() => this.props.navigation.goBack(this.props.route.params.go_back_key)} 
                />
                {/* // <RecCardTopRow rec={this.state.rec} /> */}
                <Text>{this.state.rec.title}</Text>
            {/* // <Text>{this.state.rec.title}</Text> */}
            </SafeAreaView>
            
          );
      }
      render() {
          return this.currentView()
      }
  }
  const styles = StyleSheet.create({
    goBackButton: {
        fontFamily: "Helvetica",
        fontSize: 14
    }
})