import * as React from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions,
  TouchableHighlight,
  Text
  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MoreInfo from './MoreInfo';
import Tag from './Tag';



export default function RecCardBottomRow( {rec} ) {
    
    const tagList = Object.keys(rec.tags);
    const filteredTagList = tagList.filter(function(tag) {
        return rec.tags[tag];
    });

    var tagsList = [];
    for (var i=0; i < filteredTagList.length; i++) {
      tagsList.push(<Tag key={filteredTagList[i]} tagText={filteredTagList[i]} />);
    }
  
    return (
      <View style={bottomRowStyles.bottomRow}>
        <View style={bottomRowStyles.tagGroup}>
          {tagsList}
        </View>
  
        <View style={bottomRowStyles.buttonGroup}>
          <TouchableHighlight>
            <MaterialCommunityIcons style={bottomRowStyles.mapIcon} name="heart-outline" />
          </TouchableHighlight>
          <MoreInfo />
        </View>
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
    }
})