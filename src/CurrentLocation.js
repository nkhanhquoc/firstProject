/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
  View,
  StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
// <Image source={require('/.//./')}/>;
// <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
//        style={{width: 400, height: 400}} />
export default class CurrentLocation extends Component{
  constructor(props){
    super(props);

    this.state={
      latitude: null,
      longitude: null,
      error: null,
      isLoading:true
    };
  }
  async componentDidMount(){

     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
      'title':'Tracker Phone Location',
      'message':'This app need access to phone\'s location'
    })

    if(granted == PermissionsAndroid.RESULTS.GRANTED){
      this.watchId = navigator.geolocation.watchPosition(
        (position)=>{
          this.setState({
            isLoading:false,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {this.setState({
          error: error.message,
          isLoading:false,
          });
        },
        {enableHighAccuracy: true, timeout:20000, maximumAge: 1000},
      );
    } else {
      Alert("You dont have permission to access phone's location");
    }


  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchId);
  }

  render(){
    if(this.state.isLoading){
      return(
        <View>
        <ActivityIndicator/>
        </View>
      )
    }
    return (
      <MapView
        style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        }}
      >
      <MapView.Marker
      coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude,}}
    />
    </MapView>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width,
    height
  }
});
