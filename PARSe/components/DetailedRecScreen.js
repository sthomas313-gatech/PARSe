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
        rec: null
    };

    componentDidMount() {
        const db = firebase.firestore();
        const countRef = db.collection('recs').doc(this.props.route.params.rec);
        const snapshot = countRef.get();
        if (snapshot.exists) {
            const rec = snapshot.data();
            this.state.rec = rec
            console.log(rec)
            console.log("state:" + this.state.rec.title)
        }
    }
      currentView() {
          return (
            // <RecCardTopRow rec={this.state.rec} />
            <Text>{this.props.route.params.rec}</Text>
            // <Text>{this.state.rec.title}</Text>
          );
      }
      render() {
          return this.currentView()
      }
  }