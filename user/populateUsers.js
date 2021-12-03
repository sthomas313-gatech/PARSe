import { mapAsync } from "../util";
import { getUserInfo } from "../user";


export const populateUsers = async (userIDList) => {
    return await mapAsync(userIDList, async userID => {
        const user = await getUserInfo(userID);
        return {
            userID: userID,
            user
        };
    });
}