import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet,
  Image,
  TouchableOpacity,
  
  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import firebase from '@react-native-firebase/app';
import ProfilePic from './ProfilePic';



export default function DetailedRecTopRow( {rec, navigation} ) {

  return (
    <View style={topRowStyles.topRow} >
      <View>
          {/* ProfilePicDetailed({rec.user.profilePicture}) */}
        <ProfilePicDetailed pictureURL={rec.user.profilePicture} />
      </View>
    
      <View style={topRowStyles.topRight} >
        <View style={topRowStyles.nameRestaurantRow} >
          <Text style={topRowStyles.nameText} >{rec.user.firstName} {rec.user.lastName}</Text>
          <TouchableOpacity style={topRowStyles.locationPinRow} onPress={() => navigation.navigate("DiscoverScreen")}>
            <MaterialCommunityIcons style={topRowStyles.mapIcon} name="map-marker" />
            <Text style={topRowStyles.locationText} >{rec.restaurant.location.city}, {rec.restaurant.location.state}</Text>
          </TouchableOpacity>
        </View>

        <View style={topRowStyles.usernameLocationRow}>
          <Text style={topRowStyles.usernameText} >@{rec.user.username}</Text>
          <Text style={topRowStyles.usernameText}> {time_ago(rec.created)}</Text>
        </View>

      </View>

    </View>
  );
}
function ProfilePicDetailed({pictureURL}) {

    if (!pictureURL) {
      const anon_user_url = "https://storage.googleapis.com/parse-cs8803mas.appspot.com/profilePictures/anon_user.png";
      return (
        <Image style={topRowStyles.pic} source={{uri: anon_user_url}} />
      )
    }
  
    return (
      <Image style={topRowStyles.pic} source={{uri: pictureURL}} />
    );
  }

function time_ago(time) {
  var JStime = time.toDate(); // convert from Firestore Timestamp to JavaScript Date object

    switch (typeof JStime) {
      case 'number':
        break;
      case 'string':
        JStime = +new Date(JStime);
        break;
      case 'object':
        if (JStime.constructor === Date) JStime = JStime.getTime();
        break;
      default:
        JStime = +new Date();
    }
    var time_formats = [
      [60, 'seconds', 1], // 60
      [120, '1 minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - JStime) / 1000,
      token = 'ago',
      list_choice = 1;
  
    if (seconds == 0) {
      return 'Just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      list_choice = 2;
    }
    var i = 0,
      format;
    while (format = time_formats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] == 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return JStime;
  }

function timeSince(date) {
    //console.log("date in firebase" + date)

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;    
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";

    
  }

const topRowStyles = StyleSheet.create({
    pic: {
        borderRadius: 100,
        width: 50,
        height: 50,
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
    fontSize: 22,
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
    fontSize: 22,
    color: "rgb(42,42,42)",
    justifyContent: "center",
    alignItems: "center",
  },
  locationPinRow: {
    flexDirection: "row",
    alignItems: "center"

  }
})