import * as React from 'react';
import { 
  StyleSheet, 
  } from 'react-native';
// import { MaterialCommunityIcons } from "react-native-vector-icons";

// import pot_icon from '../images/pot_icon1.png';
import { Card } from 'react-native-paper';
// import {ProfilePic} from './ProfilePic';
// import {MoreInfo} from './MoreInfo';
// import {Tag} from './Tag';
import {RecCardTopRow} from "./RecCardTopRow";
import {RecCardReview} from "./RecCardReview";
import {RecCardBottomRow} from "./RecCardBottomRow";



// const TopRow = ( {rec} ) => {
//   return (
//     <View style={topRowStyles.topRow} >

//       <View>
//         <ProfilePic picture={rec.user.picture} />
//       </View>

//       <View style={topRowStyles.topRight} >

//         <View style={topRowStyles.nameRestaurantRow} >
//           <Text style={topRowStyles.nameText} >{rec.user.firstName} {rec.user.lastName}</Text>
//           <Text style={topRowStyles.usernameText} >@</Text>
//           <Text style={topRowStyles.restaurantText} >{rec.restaurant.name}</Text>
//         </View>

//         <View style={topRowStyles.usernameLocationRow}>
//           <Text style={topRowStyles.usernameText} >@{rec.user.username}</Text>
//           <View style={topRowStyles.locationPinRow} >
//             <MaterialCommunityIcons style={topRowStyles.mapIcon} name="map-marker" />
//             <Text style={topRowStyles.locationText} >{rec.restaurant.location.city}, {rec.restaurant.location.state}</Text>
//           </View>
//         </View>

//       </View>

//     </View>
//   );
// }

// const topRowStyles = StyleSheet.create({
//   topRow: {
//     flexDirection: "row",
//     padding: 3
//     // justifyContent: "space-between"
//   },
//   topRight: {
//     justifyContent: "center",
//     // alignItems: "center",
//     // backgroundColor: "orange",
//     flex: 1,
//     paddingRight: 5
//   },
//   nameRestaurantRow: {
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexDirection: "row",
//     flex: 1,
//     // backgroundColor: "red"
//   },
//   usernameLocationRow: {
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexDirection: "row",
//     // backgroundColor: "blue",
//     padding: 0
//   },
//   nameText: {
//     fontFamily: "Helvetica",
//     fontSize: 16,
//   },
//   usernameText: {
//     fontFamily: "Helvetica",
//     fontSize: 14,
//     color: "rgb(129, 129, 129)",
//     padding: 0,
//     margin: 0
//   },
//   restaurantText: {
//     fontFamily: "Helvetica",
//     fontWeight: "bold",
//     fontSize: 16,
//     justifyContent: "space-between"
//     // backgroundColor: "rgb(240,240,240)"
//     // padding: 5
//   },
//   mapIcon: {
//     fontSize: 14,
//     // padding: 0,
//     // margin: 0
//   },
//   locationText: {
//     fontFamily: "Helvetica",
//     fontSize: 14,
//     color: "rgb(42,42,42)",
//     justifyContent: "center",
//     alignItems: "center",
//     // padding: 0,
//     // margin: 0
//   },
//   locationPinRow: {
//     flexDirection: "row",
//     // padding: 5,
//     alignItems: "center"

//   }
// })


// const Review = ( {rec} ) => {
//   return (
//     <View style={reviewStyles.reviewView} >
//       <Text style={reviewStyles.recTitleText} >{rec.title}</Text>
//       <Text style={reviewStyles.commentsText} >{rec.comments}</Text>
//     </View>
//   );
// }

// const reviewStyles = StyleSheet.create({
//   reviewView: {
//     padding: 10
//   },
//   recTitleText: {
//     fontFamily: "Helvetica",
//     fontSize: 18,
//     paddingBottom: 5
//     // paddingLeft: 5
//   },
//   commentsText: {
//     fontFamily: "Helvetica",
//     fontSize: 12,
//   },
// })


// const BottomRow = ( {rec} ) => {
//   var tagsList = [];
//   for (var i=0; i < rec.tags.length; i++) {
//     tagsList.push(<Tag key={rec.tags[i]} tagText={rec.tags[i]} />);
//   }

//   return (
//     <View style={bottomRowStyles.bottomRow}>
//       <View style={bottomRowStyles.tagGroup}>
//         {tagsList}
//       </View>

//       <View style={bottomRowStyles.buttonGroup}>
//         <TouchableHighlight>
//           <MaterialCommunityIcons style={styles.mapIcon} name="heart-outline" />
//         </TouchableHighlight>
//         <MoreInfo />
//       </View>
//     </View>
//   );
// }

// const bottomRowStyles = StyleSheet.create({
//   bottomRow: {
//     // backgroundColor: "blue",
//     flexDirection: "row",
//     padding: 10
//   },
//   tagGroup: {
//     flexDirection: "row",
//     width: 2*Dimensions.get("window").width/3 - 20,
//     flexWrap: "wrap"
//   },
//   buttonGroup: {
//     flexDirection: "row",
//     paddingLeft: 10,
//     flex: 1,
//     justifyContent: "space-around",
//     alignItems: "center"
//   }
// })






export default function RecCard2({rec}) {

  return (
    <Card style={styles.cardView}>

      <RecCardTopRow rec={rec} />

      <RecCardReview rec={rec} />

      <RecCardBottomRow rec={rec} />

    </Card>
  );
}



const styles = StyleSheet.create({
  cardView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    // padding: 5,
    margin: 3,
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
