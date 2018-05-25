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
  StyleSheet,
  AsyncStorage,
  Alert
} from 'react-native';
import MapView from 'react-native-maps';
import DeviceInfo from 'react-native-device-info';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class CurrentLocation extends Component{
  constructor(props){
    super(props);

    this.state={
      latitude: null,
      longitude: null,
      error: null,
      isLoading:true
    };
    this.deviceName = DeviceInfo.getBrand();
    this.sendLocation = this.sendLocation.bind(this);
  }

  sendLocation = async() => {
    let token = await AsyncStorage.getItem('token');
    let res = await fetch('http://api.nkhanhquoc.com/api/store',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      // body: formData
      body: JSON.stringify({
        'latitude': this.state.latitude,
        'longitude': this.state.longitude,
        'agent_token':token,
        'device':this.deviceName
      }),
    });
    let resJson = await res.json();
    if(resJson.code == 0){
      alert('save data success');
    } else {
      alert(resJson.message);
    }
  }

  async componentDidMount(){
     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
      'title':'Tracker Phone Location',
      'message':'This app need access to phone\'s location'
    })

    if(granted == PermissionsAndroid.RESULTS.GRANTED){
      console.log('accessing to phone\'s location');
      this.watchId = await navigator.geolocation.watchPosition(
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
        {enableHighAccuracy: true, timeout:60000,maximumAge: 10000},
      );
      this.sendLocation();
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
