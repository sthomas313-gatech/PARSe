import React from 'react';
import { 
    StyleSheet,
    SafeAreaView
} from 'react-native';


import MapView, {Marker} from 'react-native-maps';

import NavBar from './NavBar';
import Header from './Header';
// import { SafeAreaView } from 'react-native-safe-area-context';
import {recs} from '../static_content';



export default function DiscoverScreen( {navigation} ) {
    // build array of RecCard components
    var markerList = [];
    for (var i=0; i < recs.length; i++) {
        markerList.push(<Marker 
            key={recs[i].restaurant.name.concat(recs[i].user.username)} 
            coordinate={recs[i].restaurant.location.coordinate} 
            title={recs[i].restaurant.name}
            description={recs[i].user.username}
        />);
    }

    return (
        <SafeAreaView style={styles.container} >
                <Header />
                <MapView
                    style={styles.mapViewStyle}
                    // style={{ flex: 1 }}
                    provider="google"
                    showsUserLocation={true}
                    initialRegion={
                            {
                        latitude: 33.753746,
                        longitude: -84.386330,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                        }
                    }
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
  