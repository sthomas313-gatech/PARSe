import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'

export const deleteRestaurant = async (restaurantID) => {
    firebase.firestore()
        .collection("restaurants")
        .doc(restaurantID)
        .delete();
}