import { removeRecLike } from './removeRecLike';
import { getCurrentUser } from '../auth'; 

export const removeCurrentUserRecLike = async (recID) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    removeRecLike(recID, currentUser.id);
}