import React from 'react';
import { 
    StyleSheet,
    SafeAreaView,
    Dimensions
} from 'react-native';


import MapView, {Marker} from 'react-native-maps';
const {width, height} = Dimensions.get('window');
import Geolocation from '@react-native-community/geolocation';

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


import NavBar from './NavBar';
import Header from './Header';
// import { SafeAreaView } from 'react-native-safe-area-context';
import {recs} from '../static_content';

import { getCurrentUserFriendRecs } from '../recs/getCurrentUserFriendRecs';



export default function DiscoverScreen( {navigation} ) {
    const [markerList, setMarkerList] = React.useState(null);
    const [initialRegion, setInitialRegion] = React.useState();

    // Populate markers based on current user's friends' recs
    React.useEffect(() => {
        getCurrentUserFriendRecs()
        .then(currentUserFriendRecs => {
            var newMarkerList = [];
            for (var i=0; i < currentUserFriendRecs.length; i++) {
                const username = currentUserFriendRecs[i].user.username;
                const restaurantName = currentUserFriendRecs[i].restaurant.name;
                const city = currentUserFriendRecs[i].restaurant.location.city;
                const state = currentUserFriendRecs[i].restaurant.location.state;
                const street1 = currentUserFriendRecs[i].restaurant.street1;
                const zipcode = currentUserFriendRecs[i].restaurant.zipcode;
                const address = street1 + ", " + city + ", " + state + " " + zipcode;
                const description = address + "\n" + "@" + username;

                newMarkerList.push(<Marker 
                    key={restaurantName.concat(username)} 
                    coordinate={currentUserFriendRecs[i].restaurant.location.coordinate} 
                    title={restaurantName}
                    description={description}
                />);
            }
            setMarkerList(newMarkerList);
            console.log(`current user friend recs: ${JSON.stringify(currentUserFriendRecs)}`);
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    }, []);

    // Populate initial region based on current location
    React.useEffect(() => {
        Geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
        
            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        
            setInitialRegion(initialRegion);
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000});
    }, []);
    
  


    return (
        <SafeAreaView style={styles.container} >
                <Header navigation={navigation} createButton={true} />
                <MapView
                    style={styles.mapViewStyle}
                    provider="google"
                    showsUserLocation={true}
                    initialRegion={initialRegion}
                    // initialRegion={
                    //         {
                    //     latitude: 33.753746,
                    //     longitude: -84.386330,
                    //     latitudeDelta: 0.0922,
                    //     longitudeDelta: 0.0421
                    //     }
                    // }
                >
                    {markerList}
                </MapView>
                <NavBar navigation={navigation} />
        </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    mapViewStyle: {
      flex: 1,
      justifyContent: 'center',
    //   backgroundColor: '#ecf0f1',
    //   height: 400,
    },
  });
  