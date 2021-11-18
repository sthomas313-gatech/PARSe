import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
// import { getCurrentUser } from '../auth/getCurrentUser';
import { getRestaurant } from '../restaurant';
import { getCurrentUserInfo } from '../user/getCurrentUserInfo';
import { getUserInfo } from '../user/getUserInfo';
import { mapAsync } from '../util';

export const getCurrentUserRecs = async () => {
    // Get current user
    const currentUserInfo = getCurrentUserInfo();
    if (!currentUserInfo.id) return null;

    // Get matching rec documents
    const querySnapshot = await firebase.firestore()
        .collection("recs")
        .where("userID", "==", currentUserInfo.id)
        .get();
    
    if (!querySnapshot) {
        console.log(`getCurrentUserRecs function, querySnapshot is null: ${querySnapshot}`);
        return null;
    }

    console.log(`getCurrentUserRecs function, past the query`);

    // Put data from recs into array
    const recs = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));

    console.log(`getCurrentUserRecs function, recs ${recs}`);

    // Populate recs with restaurant data
    const populatedRecs = await mapAsync(recs, async (rec) => {
        try {
            const restaurant = await getRestaurant(rec.restaurantID);
            console.log(`populating rec ${rec} with restaurant ${restaurant}`);
        } catch (error) {
            const restaurant = {};
            restaurant["error"] = "error";
            console.log(`error populating rec ${rec} with restaurant ${restaurant}`);
        }
        
        return {
            ...rec,
            restaurant,
            currentUserInfo
        };
    })

    return populatedRecs;

};