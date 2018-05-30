/**
 * @Author: Nguyen Quoc Khanh <nkhanhquoc>
 * @Date:   30-May-2018
 * @Email:  nkhanhquoc@gmail.com
 * @Project: {PhoneLocation}
 * @Filename: DeviceLocation.js
 * @Last modified by:   nkhanhquoc
 * @Last modified time: 30-May-2018
 * @License: MIT
 * @Copyright: by nkhanhquoc@gmail.com
 */
import React, { Component } from 'react';
import {
  View,Text,StyleSheet,Image,TouchableOpacity
} from 'react-native';
import {MapView} from 'react-native-maps';
import {StackNavigator} from 'react-navigation';


class DeviceLocation extends Component{
  // static navigationOptions = {
  //   drawerLabel: 'Device Location',
  //   drawerIcon: ({ tintColor }) => (
  //     <Image
  //       source={require('../resource/images/menu-button.png')}
  //       style={[styles.icon, {tintColor: tintColor}]}
  //     />
  //   ),
  // };

  render(){
    return(
      <View>
         <Text>Device Location</Text>
      </View>
    );
  }
}

export default DeviceNavigate = StackNavigator(
  {
    Home: DeviceLocation
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Other Device\'s Location',
      drawerLabel: 'Other Device',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../resource/images/menu-button.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}>
          <Image source={require('../resource/images/menu-button.png')} style={{width:32, height:32}} />
        </TouchableOpacity>
      ),
    }),
  }
);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
