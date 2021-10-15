import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Image,
  Button,
  Dimensions,
  TouchableHighlight
  } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
// import { mdiMapMarker } from '@mdi/js';

import pot_icon from '../images/pot_icon1.png'
import { Card } from 'react-native-paper';
import ProfilePic from './ProfilePic'
import MoreInfo from './MoreInfo'

export default function RecCard({rec}) {

  return (
    <Card style={styles.cardView}>
      <View style={styles.profileRow} >

        <View style={styles.topLeft}>

          <ProfilePic picture={rec.user.picture} />
          
          <View style={styles.namesRow} >
            <Text style={styles.nameText} >{rec.user.firstName} {rec.user.lastName}</Text>
            <Text style={styles.usernameText} >@{rec.user.username}</Text>
          </View>
        
        </View>

        <View>
          <Text style={styles.restaurantText} >{rec.restaurantName}</Text>
          <View style={styles.locationRow} >
            <MaterialCommunityIcons style={styles.mapIcon} name="map-marker" />
            <Text style={styles.locationText} >{rec.location.city}, {rec.location.state}</Text>
          </View>
        </View>
        
        
      </View>

      <View style={styles.recView} >

        <View>
          <Text style={styles.recTitleText} >{rec.title}</Text>
        </View> 

        <Text style={styles.commentsText} >{rec.comments}</Text>

        <View style={styles.buttonsRow} >
        
          <TouchableHighlight>
            <MaterialCommunityIcons style={styles.mapIcon} name="heart-outline" />
          </TouchableHighlight>
          <MoreInfo />
          
        </View>

      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    // padding: 5,
    margin: 1,
    flexDirection: "row",
    fontFamily: "Arial",
    fontSize: 100,
    backgroundColor: "rgb(252, 252, 252)",
    borderRadius: 10,
    padding: 0
  },
  commentsText: {
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  locationText: {
    fontFamily: "Helvetica",
    fontSize: 14,
    color: "rgb(42,42,42)",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  profileRow: {
    flexDirection: "row",
    // backgroundColor: "rgb(245, 245, 245)",
    justifyContent: "space-between",
    borderRadius: 10
  },
  namesRow: {
    justifyContent: "center"
  },
  nameText: {
    fontFamily: "Helvetica",
    fontSize: 16,
  },
  usernameText: {
    fontFamily: "Helvetica",
    fontSize: 14,
    color: "rgb(129, 129, 129)"
  },
  recTitleText: {
    fontFamily: "Helvetica",
    fontSize: 18,
    paddingBottom: 5
    // paddingLeft: 5
  },
  restaurantText: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 20,
    backgroundColor: "rgb(240,240,240)"
    // padding: 5
  },
  recView: {
    padding: 5
  },
  mapIcon: {
    fontSize: 20
  },
  locationRow: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center"

  },
  topLeft: {
    flexDirection: "row",
  }
});
