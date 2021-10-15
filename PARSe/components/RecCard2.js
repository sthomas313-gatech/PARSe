import * as React from 'react';
import { 
  StyleSheet, 
  } from 'react-native';
  
import { Card } from 'react-native-paper';
import RecCardTopRow from "./RecCardTopRow";
import RecCardReview from "./RecCardReview";
import RecCardBottomRow from "./RecCardBottomRow";



export default function RecCard2({rec}) {

  return (
    <Card style={styles.cardView}>

      <RecCardTopRow rec={rec} />

      <RecCardReview rec={rec} />

      <RecCardBottomRow rec={rec} />

    </Card>
  );
}



const styles = StyleSheet.create({
  cardView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 3,
    flexDirection: "row",
    fontFamily: "Arial",
    fontSize: 100,
    backgroundColor: "rgb(252, 252, 252)",
    borderRadius: 10,
    padding: 0
  }
});
