import * as React from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions,
  TouchableHighlight
  } from 'react-native';
import { MaterialCommunityIcons } from "react-native-vector-icons";

import {MoreInfo} from './MoreInfo';
import {Tag} from './Tag';



export default function RecCardBottomRow( {rec} ) {
    var tagsList = [];
    for (var i=0; i < rec.tags.length; i++) {
      tagsList.push(<Tag key={rec.tags[i]} tagText={rec.tags[i]} />);
    }
  
    return (
      <View style={bottomRowStyles.bottomRow}>
        <View style={bottomRowStyles.tagGroup}>
          {tagsList}
        </View>
  
        <View style={bottomRowStyles.buttonGroup}>
          <TouchableHighlight>
            <MaterialCommunityIcons style={styles.mapIcon} name="heart-outline" />
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
    }
})