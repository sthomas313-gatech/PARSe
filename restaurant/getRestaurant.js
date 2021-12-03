import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'


export const getRestaurant = async restaurantID => {
    const restaurantInfoDoc = await firebase.firestore()
        .collection("restaurants")
        .doc(restaurantID)
        .get();
    
    const restaurantInfo = restaurantInfoDoc.data();

    if (!restaurantInfo) return null;

    return {
        ...restaurantInfo,
        id: restaurantInfoDoc.id
    };

};