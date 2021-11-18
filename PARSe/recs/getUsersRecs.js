import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getRestaurant } from '../restaurant';
import { getUserInfo } from '../user/getUserInfo';
import { mapAsync } from '../util';

export const getUsersRecs = async userList => {
    const querySnapshot = await firebase.firestore()
        .collection("recs")
        .where("username", "in", userList)
        .get();
    
    if (!querySnapshot) return null;

    const recs = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));

    const populatedRecs = await mapAsync(recs, async rec => {
        const restaurant = await getRestaurant(rec.restaurantID);
        const user = await getUserInfo(rec.username);
        return {
            ...rec,
            restaurant,
            user
        };
    })

    return populatedRecs;

};