import { getCurrentUser } from "../auth";
import { declineFollowRequest } from "./declineFollowRequest"


export const declineFollowRequestWithCurrentUser = async (otherUserID) => {
    currentUser = getCurrentUser();
    if (!currentUser) return;

    return await declineFollowRequest(currentUser.id, otherUserID);
}