// import { getCurrentUserInfo } from '../user/getCurrentUserInfo';
import { getUsersRecs } from './getUsersRecs';
import { getCurrentUser } from '../auth';

export const getCurrentUserRecs = async () => {
    // Get current user
    // const currentUserInfo = await getCurrentUserInfo();
    const currentUser = getCurrentUser();

    if (!currentUser) return null;

    console.log(`getCurrentUserRecs: currentUser: ${JSON.stringify(currentUser)}`);

    return await getUsersRecs([currentUser.id]);

};