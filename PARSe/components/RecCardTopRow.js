import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet
  } from 'react-native';
import { MaterialCommunityIcons } from "react-native-vector-icons";

import {ProfilePic} from './ProfilePic';



export default function RecCardTopRow( {rec} ) {
  return (
    <View style={topRowStyles.topRow} >

      <View>
        <ProfilePic picture={rec.user.picture} />
      </View>

      <View style={topRowStyles.topRight} >

        <View style={topRowStyles.nameRestaurantRow} >
          <Text style={topRowStyles.nameText} >{rec.user.firstName} {rec.user.lastName}</Text>
          <Text style={topRowStyles.usernameText} >@</Text>
          <Text style={topRowStyles.restaurantText} >{rec.restaurant.name}</Text>
        </View>

        <View style={topRowStyles.usernameLocationRow}>
          <Text style={topRowStyles.usernameText} >@{rec.user.username}</Text>
          <View style={topRowStyles.locationPinRow} >
            <MaterialCommunityIcons style={topRowStyles.mapIcon} name="map-marker" />
            <Text style={topRowStyles.locationText} >{rec.restaurant.location.city}, {rec.restaurant.location.state}</Text>
          </View>
        </View>

      </View>

    </View>
  );
}

const topRowStyles = StyleSheet.create({
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