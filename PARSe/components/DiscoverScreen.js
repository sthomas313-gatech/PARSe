import React from 'react';
import { 
    StyleSheet,
    SafeAreaView
} from 'react-native';


import MapView from 'react-native-maps';

import NavBar from './NavBar';
import Header from './Header';
// import { SafeAreaView } from 'react-native-safe-area-context';



export default function DiscoverScreen( {navigation} ) {
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
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                        }
                    }
                />
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
  