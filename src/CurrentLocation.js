/**
 * @Author: Nguyen Quoc Khanh <nkhanhquoc>
 * @Date:   23-May-2018
 * @Email:  nkhanhquoc@gmail.com
 * @Project: {ProjectName}
 * @Filename: CurrentLocation.js
 * @Last modified by:   nkhanhquoc
 * @Last modified time: 30-May-2018
 * @Copyright: by nkhanhquoc@gmail.com
 */


import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
  View,
  StyleSheet,
  AsyncStorage,
  Alert,
  Image,
  Button,
  TouchableOpacity,
  Text
} from 'react-native';
import MapView from 'react-native-maps';
import {createStackNavigator} from 'react-navigation';
import DeviceInfo from 'react-native-device-info';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class CurrentLocation extends Component{
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerTitle: navigation.getParam('deviceName', 'Your Phone Location'),
  //   };
  // };

  constructor(props){
    super(props);

    this.state={
      latitude: null,
      longitude: null,
      isLoading:true
    };
    // this.sendLocation = this.sendLocation.bind(this);
    watchId: (null: ?number);
  }
  sendLocation = async(position) => {
    let deviceName = DeviceInfo.getBrand().toUpperCase();
    let deviceId = DeviceInfo.getUniqueID();
    let token = await AsyncStorage.getItem('token');
    let res = await fetch('http://api.nkhanhquoc.com/api/store',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      // body: formData
      body: JSON.stringify({
        'latitude': position.coords.latitude,
        'longitude': position.coords.longitude,
        'agent_token': token,
        'device': deviceName,
        'device_id':deviceId
      }),
    });
    let resJson = await res.json();
    if(resJson.code == 0){
      console.log('save data success');
    } else {
      console.log(resJson.message);
    }
  }

  async componentDidMount(){
     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
      'title':'Tracker Phone Location',
      'message':'This app need access to phone\'s location'
    })

    if(granted == PermissionsAndroid.RESULTS.GRANTED){
      this.watchId = await navigator.geolocation.watchPosition(
      // await navigator.geolocation.getCurrentPosition(
        (position)=>{
          this.setState({
            isLoading:false,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          this.sendLocation(position);
        },
        (error) => {this.setState({
          error: error.message,
          isLoading:false,
          });
        },
        {enableHighAccuracy: false, timeout:20000},
      );
    } else {
      console.log("You dont have permission to access phone's location");
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
    } else if (this.state.error != null) {
      return(
        <View>
          <Text>{this.state.error}</Text>
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

export default CurrentNavigate = createStackNavigator(
  {
    Home: CurrentLocation
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.getParam('deviceName','Your current location'),
      drawerIcon: (
        <Image
          source={require('../resource/images/own.png')}
        />
      ),
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}>
          <Image source={require('../resource/images/menu-button.png')} style={{width:24, height:24}} />
        </TouchableOpacity>
      ),
      headerRight:(
        <Text>Dropdownlist</Text>
      )
    }),
  }
);


const styles = StyleSheet.create({
  map: {
    flex: 1,
    width,
    height
  },
  icon: {
    width: 24,
    height: 24,
  }
});
