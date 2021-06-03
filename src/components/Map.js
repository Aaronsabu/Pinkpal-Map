import React from 'react';
import { StyleSheet, View, Platform, SafeAreaView } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location';
import PubNubReact from 'pubnub-react';


const LATITUDE = 10.2315;
const LONGITUDE = 76.4088;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-b28f38b9-8df2-44ea-87c5-596690cf838a',
      subscribeKey: 'sub-c-3abcb966-baff-11eb-99ea-662615fc053c',
    });

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      errorMsg: '',
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    };

    this.pubnub.init(this);
  }

  // code to receive messages sent in a channel
  async componentDidMount() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        this.setState({errorMsg: 'Permission to access location was denied'});
        return [errorMsg];
      } else {
        this.subscribeToPubNub();
      }
0 
    })();
     
    }

  async subscribeToPubNub () {
    this.pubnub.subscribe({
      channels: ['location'],
      withPresence: true,
    });
    this.pubnub.getMessage('location', msg => {
      const { coordinate } = this.state;
      const { latitude, longitude } = msg.message;
      const newCoordinate = { latitude, longitude };

      if (Platform.OS === 'android') {
        if (this.marker) {
          this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
        }
      } else {
        coordinate.timing(newCoordinate).start();
      }

      this.setState({
        latitude,
        longitude,
      });
    });
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <MapView
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            //ref={c => (this.map = c)}
            region={this.getMapRegion() }
          >
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  map: {
    height: 250,
    borderWidth: 170
  },
});

export default Map;

//this.state.latitude ? : null
