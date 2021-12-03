import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { checkRecLikesDocExists, getRecLikes } from '../likes';
import { getRestaurant } from '../restaurant';
import { getUserInfo } from '../user/getUserInfo';
import { mapAsync } from '../util';
import { populateRecs } from './populateRecs'; 

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
        ...doc.data(),
        id: doc.id
    }));

    const populatedRecs = await populateRecs(recs);
    // return await populateRecs(recs);

    // const populatedRecs = await mapAsync(recs, async rec => {
    //     const restaurant = await getRestaurant(rec.restaurantID);
    //     const user = await getUserInfo(rec.userID);
    //     const recLikesExist = await checkRecLikesDocExists(rec.id);
    //     var recLikes = null;
    //     if (recLikesExist) {
    //         recLikes = await getRecLikes(rec.id); 
    //     }
    //     return {
    //         ...rec,
    //         restaurant,
    //         user,
    //         recLikes
    //     };
    // })

    return [populatedRecs, querySnapshot.docs[querySnapshot.docs.length -1]];

};