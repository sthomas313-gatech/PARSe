

export const sortListOfUsers = (users) => {
    users.sort((user1, user2) => sortTwoUsers(user1, user2));
    return users;
}


const sortTwoUsers = (user1, user2) => {

    if ((!user1 || !user1.firstName || !user1.lastName || !user1.username) 
    || (!user2 || !user2.firstName || !user2.lastName || !user2.username)) {
        console.log(`sortListOfUsers, cannot sort users: ${user1}, ${user2}`);
        return 0;
    }

    if (user1.lastName > user2.lastName) {
        return 1;
    } else if (user1.lastName < user2.lastName) {
        return -1;
    } 

    if (user1.firstName > user2.firstName) {
        return 1;
    } else if (user1.firstName < user2.firstName) {
        return -1;
    } 

    if (user1.username > user2.username) {
        return 1;
    } else if (user1.username < user2.username) {
        return -1;
    } 

    return 0;

    // if (user1.userID > user2.userID) {
    //     return 1;
    // } else if (user1.userID < user2.userID) {
    //     return -1;
    // } 

    // return 0;

}