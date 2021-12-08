import { mapAsync } from "../util";
import { getRestaurant } from "../restaurant";
import { getUserInfo } from "../user";
import { checkRecLikesDocExists, getRecLikes } from "../likes";


export const populateRecs = async (recs) => {
    return await mapAsync(recs, async rec => {
        const restaurant = await getRestaurant(rec.restaurantID);
        const user = await getUserInfo(rec.userID);
        const recLikesExist = await checkRecLikesDocExists(rec.id);
        var recLikes = null;
        if (recLikesExist) {
            recLikes = await getRecLikes(rec.id); 
        }
        return {
            ...rec,
            restaurant,
            user,
            recLikes
        };
    });
}