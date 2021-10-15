import * as React from 'react';
import { 
  StyleSheet, 
  Image,
  Dimensions
} from 'react-native';


export default function ProfilePic({picture}) {
  return (
    <Image style={styles.pic} source={picture} />
  );
}

const styles = StyleSheet.create({
  pic: {
    borderRadius: 100,
    width: Dimensions.get("window").width/10,
    height: Dimensions.get("window").width/10,
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 2,
    marginTop: 2
  }
});
