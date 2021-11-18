import { getCurrentUserFriendRecs } from './getCurrentUserFriendRecs';
import { getCurrentUserRecs } from './getCurrentUserRecs';


export const getCurrentUserAndFriendRecs = async () => {
    try {
        const friendRecs = await getCurrentUserFriendRecs(); 
        const currentUserRecs = await getCurrentUserRecs();
        return friendRecs.concat(currentUserRecs);
    } catch (error) {
        console.log(`error in getCurrentUserAndFriendRecs: ${error}`);
        return null;
    }

}