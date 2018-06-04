import React, { Component } from 'react';
import { Button, View, Text,AsyncStorage,TextInput } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class LoginScreen extends Component{
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props){
    super(props);
    state = {
      email:'',
      password:'',
      valid:false,
      showError: false
    }
    this.onPressButton = this.onPressButton.bind(this);//khai bao de su dung state, props
  }

/**
 * Kiem tra tai khoan va ghi token
 * @method onPressButton
 * @param  {[type]}      val  [state]
 * @param  {[type]}      navi [navigation]
 * @return {Promise}          [description]
 */
async onPressButton(val){
    let email = val.email.toLowerCase().trim();
    console.log(email);
    let deviceId = DeviceInfo.getUniqueID();

    try{
      let res = await fetch('http://api.nkhanhquoc.com/api/check',{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        // body: formData
        body: JSON.stringify({
          'email': email,
          'password': val.password,
          'device_id':deviceId
        }),
      });
      let resJson = await res.json();
      if(resJson.code == 0){
        console.log('token: '+resJson.data.token);
        console.log('device name: '+resJson.data.device_name);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.setItem('token', resJson.data.token);
        // .then(() => this.props.navigation.navigate('Maps'));
        let token = await AsyncStorage.getItem('token');
        if(token != null){
          if(resJson.data.device_name == null || resJson.data.device_name == ''){
            console.log("device has no name");
            this.props.navigation.navigate('Setup',{ agentId: resJson.data.id });
          } else {
            console.log('redirect to Maps');
            this.props.navigation.navigate('ThisLocation',{
              deviceName: resJson.data.device_name
            });
          }

        }
        else {
          console.log('cant save AsyncStorage');
        }
      } else {
        console.log(resJson.message);
      }
    }catch(e){
      console.error(e);
    }
  }

  render(){
    return(
      <View style={{flex:1, alignItems: 'center',justifyContent:'center'}}>
        <TextInput  style={{height:40,width:300}}
        placeholder='email exp: jonhdoe@example.com'
        onChangeText={
          (email) => this.setState({email})
        }
        keyboardType='email-address'
        />
        <TextInput style={{height:40,width:300,paddingTop:10}}
        placeholder='secret password'
        onChangeText={
          (text) => this.setState({password:text})
        }
        secureTextEntry={true}
        />
        <Button onPress={() => this.onPressButton(this.state)} title="Login/Register"/>
      </View>
    )
  }
}
