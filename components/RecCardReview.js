import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet
  } from 'react-native';



export default function RecCardReview( {rec} ) {
    return (
        <View style={reviewStyles.reviewView} >
        <Text style={reviewStyles.recTitleText} >{rec.title}</Text>
        <Text style={reviewStyles.commentsText} >{rec.comments}</Text>
        </View>
    );
}

const reviewStyles = StyleSheet.create({
    reviewView: {
        padding: 10
    },
    recTitleText: {
        fontFamily: "Helvetica",
        fontSize: 18,
        paddingBottom: 5
        // paddingLeft: 5
    },
    commentsText: {
        fontFamily: "Helvetica",
        fontSize: 12,
    },
})