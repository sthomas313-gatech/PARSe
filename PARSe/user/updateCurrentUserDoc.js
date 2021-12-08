import { getCurrentUser } from '../auth/getCurrentUser';
import { updateUserDoc } from './updateUserDoc';

export const updateCurrentUserDoc = async (updates) => {
    const currentUser = getCurrentUser();

    if (!currentUser) return;

    updateUserDoc(currentUser.id, updates);
};