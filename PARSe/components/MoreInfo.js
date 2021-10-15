import * as React from 'react';
import { 
  View, 
  StyleSheet
  } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MoreInfo() {
  return (
    <View style={styles.iconRow}>
      <MaterialCommunityIcons style={styles.circleIcon} name="circle-outline" />
      <MaterialCommunityIcons style={styles.circleIcon} name="circle-outline" />
      <MaterialCommunityIcons style={styles.circleIcon} name="circle-outline" />
    </View>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 2,
  },
  circleIcon: {
    fontSize: 10,
    padding: 3
  }
});
