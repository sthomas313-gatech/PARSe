import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { deleteRestaurant } from './deleteRestaurant';


export const checkRestaurantRecDependency = async (restaurantID) => {
    var querySnapshot = await firebase.firestore()
        .collection("recs")
        .where("restaurantID", "==", restaurantID)
        .limit(1)
        .get();

    if (!querySnapshot) return null;

    const recs = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));

    if (recs.length == 0) {
        return false; // at least one recommendation still depends on this restaurant
    } else {
        // TODO: call deleteRestaurant
        // deleteRestaurant(restaurantID);
        return true; // no recommendations still depend on this restaurant -- delete it;

    }
    
}