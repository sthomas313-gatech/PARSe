import * as React from 'react';
import { 
  View, 
  Text,
  StyleSheet
  } from 'react-native';

export default function Tag( {tagText} ) {
  return (
    <View style={styles.tagView}>
      <Text style={styles.tagTextStyle}>{tagText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tagView: {
    borderRadius: 15,
    borderColor: "rgb(239, 187, 125)",
    borderWidth: 1,
    padding: 4,
    marginRight: 3,
    marginBottom: 3
  },
  tagTextStyle: {
    fontSize: 13,
    fontFamily: "Helvetica",
    color: "rgb(239, 187, 125)"
  }
});
