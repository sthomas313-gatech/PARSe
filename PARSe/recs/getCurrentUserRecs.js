// import { getCurrentUserInfo } from '../user/getCurrentUserInfo';
import { getUsersRecs } from './getUsersRecs';
import { getCurrentUser } from '../auth';

export const getCurrentUserRecs = async (limit=null, orderBy={field: "created", direction: "desc"}, startAfter=null) => {
    const currentUser = getCurrentUser();

    if (!currentUser) return null;

    // console.log(`getCurrentUserRecs: currentUser: ${JSON.stringify(currentUser)}`);

    return await getUsersRecs([currentUser.id], limit=limit, orderBy=orderBy, startAfter=startAfter);

};