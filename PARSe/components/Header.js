import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Image,
  TouchableHighlight
  } from 'react-native';

import pot_icon from '../images/pot_icon1.png'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header( {navigation=null, topLeftElement=null, createButton=false, text=" Stirring the Pot "} ) {

  return (
    <View style={topLeftElement ? styles.headerView3 : styles.headerView2}>
        <Image style={styles.icon} source={pot_icon} />
        <Text style={styles.headerText} > {text} </Text>

        { topLeftElement }
    </View>
  );
}


// export default function Header( {navigation=null, topLeftElement=null, createButton=false, text=" Stirring the Pot "} ) {

//   return (
//     <View style={styles.headerView}>
//       <View style={styles.iconTitleView} >
//         <Image style={styles.icon} source={pot_icon} />
//         <Text style={styles.headerText} > {text} </Text>
//       </View>

//       { createButton &&
//         <TouchableHighlight 
//           style={styles.plusHighlight} 
//           onPress={() => navigation.navigate("CreateScreen")}
//         >
//           <MaterialCommunityIcons style={styles.plusIcon} name="plus" />
//         </TouchableHighlight>
//       }
//     </View>
//   );
// }

const styles = StyleSheet.create({
  headerView2: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 100,
    backgroundColor: "rgb(239, 187, 125)",
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
    margin: 3
  },
  headerView3: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 100,
    backgroundColor: "rgb(239, 187, 125)",
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
    margin: 3
  },
  iconTitleView: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerText: {
    fontFamily: "Chalkduster",
    fontSize: 25
  },
  icon: {
    height: 30,
    width: 30
  },
  plusIcon: {
    fontSize: 30
  },
  plusHighlight: {
    borderRadius: 15,
    borderWidth: 1
  }
});
