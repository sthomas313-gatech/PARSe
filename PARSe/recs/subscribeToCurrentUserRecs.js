import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getCurrentUser } from '../auth'
import { mapAsync } from '../util';
import { getRestaurant } from '../restaurant';
import { getUserInfo } from '../user';

export const subscribeToCurrentUserRecs = (cb) => {

    const currentUser = getCurrentUser();
    if (!currentUser) return cb([]);

    const callback = async (querySnapshot) => {
        const recs = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
    
        const populatedRecs = await mapAsync(recs, async rec => {
            const restaurant = await getRestaurant(rec.restaurantID);
            const user = await getUserInfo(rec.userID);
            return {
                ...rec,
                restaurant,
                user
            };
        });

        cb(populatedRecs);

    }

    return firebase.firestore()
        .collection("recs")
        .where("userID", "==", currentUser.id)
        .onSnapshot(callback);
}