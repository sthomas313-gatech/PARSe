import { getCurrentUser } from '../auth';
import { getFollowers } from './getFollowers';


export const getCurrentUserFollowers = async () => {
    const currentUser = getCurrentUser();

    if (!currentUser) return null;
    
    return await getFollowers(currentUser.id);
};