import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
// import { getCurrentUser } from '../auth/getCurrentUser';
import { getRestaurant } from '../restaurant';
import { getCurrentUserInfo } from '../user/getCurrentUserInfo';
import { getUserInfo } from '../user/getUserInfo';
import { mapAsync } from '../util';

export const getCurrentUserRecs = async friendList => {
    // Get current user
    const currentUserInfo = getCurrentUserInfo();
    if (!currentUserInfo.id) return null;

    // Get matching rec documents
    const querySnapshot = await firebase.firestore()
        .collection("recs")
        .where("userID", "==", currentUserInfo.id)
        .get();
    
    if (!querySnapshot) return null;

    // Put data from recs into array
    const recs = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));

    // Populate recs with restaurant data
    const populatedRecs = await mapAsync(recs, async rec => {
        try {
            const restaurant = await getRestaurant(rec.restaurantID);
        } catch (error) {
            const restaurant = {};
            restaurant["error"] = "error";
        }
        return {
            ...rec,
            restaurant,
            currentUserInfo
        };
    })

    return populatedRecs;

};