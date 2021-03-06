import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Image 
  } from 'react-native';

  import pot_icon from '../images/pot_icon1.png'

export default function Header2() {
  return (
    <View style={styles.headerView}>
      <Image style={styles.icon} source={pot_icon} />
      <Text style={styles.headerText} > Stirring the Pot </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: "row",
    // fontFamily: "Helvetica",
    // fontSize: 100,
    backgroundColor: "rgb(239, 187, 125)",
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
    // margin: 3
  },
  headerText: {
    fontFamily: "Chalkduster",
    fontSize: 25
  },
  icon: {
    height: 30,
    width: 30
  }
});
