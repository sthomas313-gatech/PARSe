import { getCollectionDocsWhere } from '../firestore_helpers';


export const getFollowers = async (userID) => {
    const collection = "friends";
    const result = await getCollectionDocsWhere(collection, [userID, "==", true]);

    if (!result) return null;

    // console.log(`getFollowers: ${JSON.stringify(result, undefined, 2)}`);

    // return {};

    var followerList = [];
    result.forEach((item) => {
        followerList.push(item.id);
    });

    return {
        followerList: followerList,
        userID: userID
    }
};