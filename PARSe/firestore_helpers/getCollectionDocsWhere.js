import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'

export const getCollectionDocsWhere = async (collection, where) => {

    var query = firebase.firestore()
        .collection(collection)
        .where(where[0], where[1], where[2])

    var querySnapshot = await query.get()
    
    if (!querySnapshot) return null;

    const items = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));

    return items
};