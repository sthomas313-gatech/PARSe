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

import { getCurrentUserAndFriendRecs } from '../recs';



export default function DiscoverScreen( {navigation} ) {
    const [markerList, setMarkerList] = React.useState(null);
    const [initialRegion, setInitialRegion] = React.useState();
    const [mapViewRegion, setMapViewRegion] = React.useState();
    const [recsList, setRecsList] = React.useState([]);


    const handleMarkerPress = (e) => {
        if ("nativeEvent" in e && "coordinate" in e.nativeEvent) {
            var region = {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
            setMapViewRegion(region);
        }
    }



    // Populate markers based on current user's friends' recs
    React.useEffect(() => {
        getCurrentUserAndFriendRecs(limit=null, orderBy={field: "created", direction: "desc"}, startAfter=null)
        .then((result) => {
            const [recs, lastDoc] = result;
            // console.log()
            console.log(`current user and friend recs: ${JSON.stringify(recs, undefined, 2)}`);
            setRecsList(recs);

            var newMarkerList = [];
            recs.forEach((rec) => {
                var username = "";
                if ("user" in rec && "username" in rec.user) {
                    username = rec.user.username;
                }
                var restaurantName = "";
                var coordinate = null;
                var street1 = "";
                var zipcode = "";
                var city = "";
                var state = "";
                if ("restaurant" in rec) {
                    if ("name" in rec.restaurant) {
                        restaurantName = rec.restaurant.name;
                    }
                    if ("location" in rec.restaurant) {
                        if ("coordinate" in rec.restaurant.location) {
                            coordinate = rec.restaurant.location.coordinate;
                        }
                        if ("street1" in rec.restaurant.location) {
                            street1 = rec.restaurant.location.street1;
                        }
                        if ("zipcode" in rec.restaurant.location) {
                            zipcode = rec.restaurant.location.zipcode;
                        }
                        if ("city" in rec.restaurant.location) {
                            city = rec.restaurant.location.city;
                        }
                        if ("state" in rec.restaurant.location) {
                            state = rec.restaurant.location.state;
                        }
                        
                    }
                }

                var full_address = `${street1}, ${city}, ${state} ${zipcode}`;
                var description = `${full_address}\n@${username}`;

                if (coordinate) {
                    newMarkerList.push(<Marker 
                        key={restaurantName.concat(username)} 
                        coordinate={coordinate} 
                        title={restaurantName}
                        description={description}
                        onPress={(pressParams) => handleMarkerPress(pressParams)}
                    />);
                }

            })

            setMarkerList(newMarkerList);
            
        })
        .catch((error) => {
            console.log(`erroring in Discover Screen load!`);
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
            setMapViewRegion(initialRegion);
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
                    region={mapViewRegion}
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
  