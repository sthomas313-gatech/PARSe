import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { getRestaurant } from '../restaurant';
import { getUserInfo } from '../user/getUserInfo';
import { mapAsync } from '../util';

export const getUsersRecs = async (userList, limit=null, orderBy=null, startAfter=null) => {

    // console.log(`getUsersRecs: limit: ${limit}, orderBy: ${JSON.stringify(orderBy)}, startAfter: ${startAfter}`);

    var query = firebase.firestore()
        .collection("recs")
        .where("userID", "in", userList)
    
    if (orderBy) {
        query = query.orderBy(orderBy.field, orderBy.direction)
    }

    if (startAfter) {
        query = query.startAfter(startAfter)
    }

    if (limit) {
        query = query.limit(limit);
    }

    var querySnapshot = await query.get()
    
    if (!querySnapshot) return null;

    const recs = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));

    const populatedRecs = await mapAsync(recs, async rec => {
        const restaurant = await getRestaurant(rec.restaurantID);
        const user = await getUserInfo(rec.userID);
        return {
            ...rec,
            restaurant,
            user
        };
    })

    return [populatedRecs, querySnapshot.docs[querySnapshot.docs.length -1]];

};