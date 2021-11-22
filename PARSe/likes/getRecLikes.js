import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
// import { getCurrentTimestamp } from '../time';


export const getRecLikes = async (recID) => {
    // console.log(`getRecLikes:`);
    const recLikesDoc = await firebase.firestore()
        .collection("recLikes")
        .doc(recID)
        .get();
    
    if (!recLikesDoc) {
        console.log(`no likes I suppose?`);
    }

    const recLikes = recLikesDoc.data();

    if (!recLikes) return {};

    var recLikesCount = 0;
    var recLikesKeys = Object.keys(recLikes);
    recLikesKeys.forEach((key) => {
        if (key != "created" && key != "updated") {
            if (recLikes[key]) {
                recLikesCount += 1;
            }
        }
    });

    return {
        ...recLikes,
        id: recLikesDoc.id,
        likeCount: recLikesCount
    };
}