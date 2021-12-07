import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
  } from 'react-native';
  import MapView, {Marker, infoWindow, onCalloutPress, onSelect, Callout} from 'react-native-maps';
import { initializeApp } from 'firebase-admin/app';
//   const width = 500;
// const height = 200;
  const {width, height} = Dimensions.get('window');

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function DetailedRecMap( {rec, navigation} ) {
    var restaurantName = "";
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
    
    const mapViewRegion = {
        latitude: rec.restaurant.location.coordinate.latitude,
        longitude: rec.restaurant.location.coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }
    const initialRegion = {
        latitude: rec.restaurant.location.coordinate.latitude,
        longitude: rec.restaurant.location.coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }

    return (
      <View style={styles.container}>
        <Text style={styles.address}>{full_address}</Text>
        <MapView
            style={styles.mapViewStyle}
            provider="google"
            showsUserLocation={false}
            initialRegion={initialRegion}
            region={mapViewRegion}
            onPress={() => navigation.navigate("Discover")}
        >
             <Marker 
                key={rec.restaurantName} 
                coordinate={rec.restaurant.location.coordinate} 
            >
            </Marker>
        </MapView>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    address: {
        fontSize: 14,
        padding: 8,
    },
    mapViewStyle: {
        paddingTop:10,
      flex: 1,
      justifyContent: 'center',
      width: width,
      height: 250,
      ...StyleSheet.absoluteFillObject,
    //   backgroundColor: '#ecf0f1',
    //   height: 400,
    },
  });