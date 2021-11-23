import * as React from 'react';
import { 
    TouchableHighlight, 
    StyleSheet
  } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function AddRecButton( {navigation} ) {
    return (
        <TouchableHighlight 
          style={styles.plusHighlight} 
          onPress={() => navigation.navigate("CreateScreen")}
        >
          <MaterialCommunityIcons style={styles.plusIcon} name="plus" />
        </TouchableHighlight>
    )
}



const styles = StyleSheet.create({
    plusIcon: {
      fontSize: 30
    },
    plusHighlight: {
      borderRadius: 15,
      borderWidth: 1
    }
  });