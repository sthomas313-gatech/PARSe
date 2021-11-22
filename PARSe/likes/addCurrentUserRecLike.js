import { addRecLike } from './addRecLike';
import { getCurrentUser } from '../auth'; 

export const addCurrentUserRecLike = async (recID) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    addRecLike(recID, currentUser.id);
}