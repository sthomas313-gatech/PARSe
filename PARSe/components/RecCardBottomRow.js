import * as React from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions,
  TouchableHighlight,
  Text,
  Alert
  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MoreInfo from './MoreInfo';
import Tag from './Tag';

import { deleteRec } from '../recs';



export default function RecCardBottomRow( {rec, editView=false} ) {


    const [tagList, setTagList] = React.useState([]);
    const [tagElementList, setTagElementList] = React.useState([]);
    const [recInfo, setRecInfo] = React.useState(rec);
    const [editViewVal, setEditViewVal] = React.useState(editView);

    React.useEffect( () => {

      console.log(`RecCardBottomCard, param rec: ${JSON.stringify(rec)}`);

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
      
    }, [])


    const handleDeleteRec = async () => {
      console.log(`delete rec: ${JSON.stringify(recInfo, undefined, 2)}`);
      deleteRec(recInfo.id, recInfo.userID)
        .then(() => {
          console.log(`successfully deleted rec: ${recInfo.id}`);
        })
        .catch((error) => {
          console.log(`error deleting rec: ${error}`)
        });
    };


    const handleDeleteRecAlert = async () => {
      Alert.alert(
        "Are you sure?",
        `Are you sure you want to delete your recommendation for the restaurant: '${recInfo.restaurant.name}'?`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => handleDeleteRec() }
        ]
      );
      
    }
  
    return (
      <View style={bottomRowStyles.bottomRow}>
        <View style={bottomRowStyles.tagGroup}>
          {tagElementList}
        </View>

        {(!editView)
        ? 
          <View style={bottomRowStyles.buttonGroup}>
            <TouchableHighlight>
              <MaterialCommunityIcons style={bottomRowStyles.mapIcon} name="heart-outline" />
            </TouchableHighlight>
            <MoreInfo />
          </View>
        :
        <View style={bottomRowStyles.buttonGroup}>
            <TouchableHighlight onPress={handleDeleteRecAlert} >
              <MaterialCommunityIcons style={bottomRowStyles.deleteIcon} name="delete" />
            </TouchableHighlight>
          </View>
        }
        
      </View>
    );
}
  
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
        justifyContent: "space-around",
        alignItems: "center"
    },
    mapIcon: {
        fontSize: 20
    }, 
    deleteIcon: {
      fontSize: 20,
      color: "red"
    }
})