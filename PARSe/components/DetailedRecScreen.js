import React, { useEffect, useState, Children } from 'react';
import { 
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  RefreshControl,
  Button,
  View
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
    // firestoreRef = firebase.firestore().collection('recs').doc(this.props.route.params.rec);

    componentDidMount() {
        //this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollectionToolsRental);
        const rec = this.props.route.params.rec
        this.setState({rec})
    }

    // getCollectionToolsRental = (querySnapshot) => {
    //     console.log("this is the query snapshot:" + querySnapshot)
    //     console.log(querySnapshot.data())
    //     const rec = querySnapshot.data()
    //     this.setState({rec})
    //     console.log(this.state.rec)
    // }
    currentView() {
          return (
            <SafeAreaView>
                <Button 
                title="Go Back" 
                style={styles.goBackButton}
                onPress={() => this.props.navigation.goBack(this.props.route.params.go_back_key)} 
                />
                <RecCardTopRow rec={this.props.route.params.rec} style ={{paddingBottom: 3}}/>
                <View
                  style={{
                    paddingTop: 3,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                  }}
                />
                <Text>{this.state.rec.title}</Text>
                <Text>{this.state.rec.comments}</Text>
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