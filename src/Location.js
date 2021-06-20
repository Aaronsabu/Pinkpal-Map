//import './_mockLocation';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Map from './components/Map';

const Location = () => {

    return (
       <View style={styles.container}>
         <Map />
       </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:5,
        alignItems: 'center',
        
    }
});

export default Location;

