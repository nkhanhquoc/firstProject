/**
 * @Author: Nguyen Quoc Khanh
 * @Date:   04-Jun-2018
 * @Email:  nkhanhquoc@gmail.com
 * @Project: {ProjectName}
 * @Filename: LogOut.js
 * @Last modified by:   Nguyen Quoc Khanh
 * @Last modified time: 04-Jun-2018
 * @Copyright: by nkhanhquoc@gmail.com
 */
import React, { Component } from 'react';
import { AsyncStorage,StatusBar,View,ActivityIndicator } from 'react-native';

export default class Logout extends Component{
  constructor(props){
    super(props);
    this.clearToken();
  }

  static navigationOptions = {
    drawerLabel: 'Logout',
  };

  clearToken = async() => {
    await AsyncStorage.removeItem('token');
    this.props.navigation.navigate('Login');
  }

  render(){
    return(
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }

}
