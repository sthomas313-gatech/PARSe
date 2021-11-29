import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import { mapAsync } from '../util';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function capitalizeAll(string) {
    return string.toUpperCase();
}

function lowercaseAll(string) {
    return string.toLowerCase();
}


export const searchUsers = async (searchStr) => {

    // console.log(`searchUsers function:`);
    // console.log(`searchStr: ${searchStr}`);

    if (!searchStr) return [];

    var searchArr = [];

    searchStr.split(" ").forEach((word) => {
        // console.log(`split, word: ${word}`);
        var wordVariations = [capitalizeFirstLetter(word), lowercaseAll(word), capitalizeAll(word)];
        wordVariations.forEach((variation) => {
            const lowerWordBound = variation.length > 1 ? variation.slice(0,-1) : variation;
            const wordBounds = [lowerWordBound, variation + "z"];
            searchArr.push(wordBounds);
        });
    });

    searchArr = [...new Set(searchArr)];

    // console.log(`searchArr: ${JSON.stringify(searchArr, undefined, 2)}`);

    const whereClauses = ["firstName", "lastName", "username"];

    var allResults = await mapAsync(whereClauses, async (where) => {
        var tempUsersList = await mapAsync(searchArr, async (bounds) => {
            const [lower, upper] = bounds;
            const users = await searchUsersWithBounds(where, lower, upper);
            return users;
        });

        return tempUsersList;
    });

    allResults = allResults.flat(2); // flatten results
    allResults = [...new Set(allResults)]; // remove duplicates

    var uniqueResults = [];
    var uniqueUserIDs = new Set();
    allResults.forEach((user) => {
        if (!(uniqueUserIDs.has(user.id))) {
            uniqueResults.push(user);
            uniqueUserIDs.add(user.id);
        }
    });
    // console.log(`all results: ${JSON.stringify(allResults, undefined, 2)}`);
    // console.log(`unique results: ${JSON.stringify(uniqueResults, undefined, 2)}`);

    return uniqueResults;

};



const searchUsersWithBounds = async (field, lower, upper) => {
    // console.log(`searchUsersWithBounds: ${field}, ${lower}, ${upper}`);

    const usersRef = firebase.firestore().collection("users");

    const snapshot = await usersRef
            .where(field, ">=", lower)
            .where(field, "<=", upper)
            .get();

    if (!snapshot) {
        console.log(`snapshot is null`);
        return null;
    }
    
    const users = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));

    if (!users) {
        console.log(`users is null`);
        return null;
    }
    // console.log(`users: ${JSON.stringify(users)}`);
    
    return users;
}