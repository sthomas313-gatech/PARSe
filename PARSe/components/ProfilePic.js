import * as React from 'react';
import { 
  StyleSheet, 
  Image,
  Dimensions
} from 'react-native';
import { readFile } from '../util';


export default function ProfilePic({pictureURL}) {

  if (!pictureURL) {
    const anon_user_url = "https://storage.googleapis.com/parse-cs8803mas.appspot.com/profilePictures/anon_user.png";
    return (
      <Image style={styles.pic} source={{uri: anon_user_url}} />
    )
  }

  return (
    <Image style={styles.pic} source={{uri: pictureURL}} />
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
