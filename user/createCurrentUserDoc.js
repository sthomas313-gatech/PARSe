import { getCurrentUser } from '../auth/getCurrentUser';
import { createUserDoc } from './createUserDoc';

export const createCurrentUserDoc = async (updates) => {
    const currentUser = getCurrentUser();

    if (!currentUser) return;

    createUserDoc(currentUser.id, updates);
};