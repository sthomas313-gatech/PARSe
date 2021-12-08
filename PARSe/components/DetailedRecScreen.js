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
import  DetailedRecTopRow  from "./DetailedRecTopRow";
import  DetailedRecMiddle  from "./DetailedRecMiddle";


// custom components
import Header from './Header';
import RecCard from './RecCard';
import NavBar from './NavBar';

// firestore
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import { getCurrentUserAndFriendRecs } from "../recs";
import { getCurrentTimestamp } from '../time';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfilePic from './ProfilePic';
import RecCardBottomRow from './RecCardBottomRow';
import DetailedRecMap from './DetailedRecMap';

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


    currentView() {
          return (
            <SafeAreaView>
                <Header topLeftElement={goBackButton(this.props.navigation, this.props.route.params.go_back_key)} />
                
                {/* <RecCardTopRow rec={this.props.route.params.rec} style ={{paddingBottom: 3}}/>
                 */}
                {<DetailedRecTopRow rec={this.props.route.params.rec} navigation = {this.props.navigation} style ={{paddingBottom: 3}}/>}
                <View
                  style={{
                    paddingTop: 10,
                    borderBottomColor: '#d3d3d3',
                    borderBottomWidth: 1,
                  }}
                />
                {<DetailedRecMiddle rec={this.props.route.params.rec} navigation = {this.props.navigation} style ={{paddingBottom: 3}}/>}
                {<DetailedRecMap rec={this.props.route.params.rec} navigation = {this.props.navigation} style ={{paddingBottom: 3}}/>}
                
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
function goBackButton (navigation, key) {
  return (
    <Button 
      title="Go Back" 
      style={styles.goBackButton}
      onPress={() => navigation.goBack(key)} 
    />
  )
}
const topRowStyles = StyleSheet.create({
  pic: {
    borderRadius: 100,
    width: 25,
    height: 25,
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 2,
    marginTop: 2
  },
  topRow: {
    flexDirection: "row",
    padding: 3
  },
  topRight: {
    justifyContent: "center",
    flex: 1,
    paddingRight: 5
  },
  nameRestaurantRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  usernameLocationRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 0
  },
  nameText: {
    fontFamily: "Helvetica",
    fontSize: 16,
  },
  usernameText: {
    fontFamily: "Helvetica",
    fontSize: 14,
    color: "rgb(129, 129, 129)",
    padding: 0,
    margin: 0
  },
  restaurantText: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "space-between"
  },
  mapIcon: {
    fontSize: 14,
  },
  locationText: {
    fontFamily: "Helvetica",
    fontSize: 14,
    color: "rgb(42,42,42)",
    justifyContent: "center",
    alignItems: "center",
  },
  locationPinRow: {
    flexDirection: "row",
    alignItems: "center"

  }
})