import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight
  
  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addCurrentUserRecLike, removeCurrentUserRecLike } from '../likes';
import { getCurrentUser } from '../auth';
import Tag from './Tag';




export default function DetailedRecMiddle( {rec, navigation} ) {

    const [tagList, setTagList] = React.useState([]);
    const [tagElementList, setTagElementList] = React.useState([]);
    const [recInfo, setRecInfo] = React.useState(rec);
    const [currentUserLiked, setCurrentUserLiked] = React.useState(false); // TODO 


    React.useEffect( () => {

      // console.log(`RecCardBottomCard, param rec: ${JSON.stringify(rec)}`);

      if (rec && "tags" in rec) {
        const tempTagList = Object.keys(rec.tags);
        const tempFilteredTagList = tempTagList.filter(function(tag) {
          return rec.tags[tag];
        });
        setTagList(tempFilteredTagList);

        var tempTagElementList = [];
        tempFilteredTagList.forEach((tag) => {
          tempTagElementList.push(<Tag key={tag} tagText={tag} />);
        });
        setTagElementList(tempTagElementList);
      }

      const currentUser = getCurrentUser();

      if (rec && "recLikes" in rec && rec.recLikes && currentUser && currentUser.id in rec.recLikes) {
        // console.log(`setting currentUserLiked to: ${rec.recLikes[currentUser.id]}`);
        setCurrentUserLiked(rec.recLikes[currentUser.id]);
      }
      
    }, []);

    const handleLikeRec = async () => {
      console.log(`pressed like button for rec ${recInfo.id}`);

      if (currentUserLiked == true) {
        removeCurrentUserRecLike(recInfo.id).then(() => {
          console.log(`removed like!`);
        });
      } else if (currentUserLiked == false) {
        addCurrentUserRecLike(recInfo.id).then(() => {
          console.log(`added like!`);
        });
      }
      setCurrentUserLiked(!currentUserLiked);
    }
  return (
    <View style={reviewStyles.reviewView} >
        <View style={topRowStyles.topRow}>
        <Text style={reviewStyles.recResturantText} >{rec.restaurant.name}</Text>
        <View style={bottomRowStyles.buttonGroup}>
            <TouchableHighlight onPress={handleLikeRec} >
              {currentUserLiked ?
              <MaterialCommunityIcons style={bottomRowStyles.heartIconLiked} name="heart" />
              :
              <MaterialCommunityIcons style={bottomRowStyles.heartIcon} name="heart-outline" /> 
              }
            </TouchableHighlight>
            {/* <MoreInfo /> */}
          </View>
        </View>
        <Text style={reviewStyles.recTitleText} >{rec.title}</Text>
        <Text style={reviewStyles.commentsText} >{rec.comments}</Text>
        <View style={bottomRowStyles.tagGroup}>
          {tagElementList}
        </View>
    </View>
  );
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
const reviewStyles = StyleSheet.create({
    recResturantText: {
        fontFamily: "Helvetica",
        fontWeight: "bold",
        fontSize: 25,
        paddingBottom: 5,
        paddingTop: 5
    },
    reviewView: {
        padding: 10
    },
    recTitleText: {
        fontFamily: "Helvetica",
        fontSize: 18,
        paddingBottom: 5,
        paddingTop: 10
        // paddingLeft: 5
    },
    commentsText: {
        fontFamily: "Helvetica",
        fontSize: 12,
        paddingBottom: 10,
    },
})
const bottomRowStyles = StyleSheet.create({
    bottomRow: {
        // backgroundColor: "blue",
        flexDirection: "row",
        padding: 10
    },
    tagGroup: {
        flexDirection: "row",
        width: 2*Dimensions.get("window").width/3 - 20,
        flexWrap: "wrap"
    },
    buttonGroup: {
        flexDirection: "row",
        paddingLeft: 10,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    heartIcon: {
        fontSize: 20
    }, 
    heartIconLiked: {
      fontSize: 20,
      color: "red"
    },
    deleteIcon: {
      fontSize: 20,
      color: "red"
    }
})