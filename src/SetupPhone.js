import React, { Component } from 'react';
import { Button, View, Text,AsyncStorage,TextInput } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class SetupPhone extends Component{
  static navigationOptions = {
    title: 'SetupPhone',
  };

  constructor(props){
    super(props);
    state = {
      phonename:'',
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
      let name = val.phonename.trim();
      console.log(name);
      let deviceId = DeviceInfo.getUniqueID();
      let agentId = this.props.navigation.getParam('agentId',0);
      console.log(JSON.stringify({
        'agent_id': agentId,
        'device_name': name,
        'device_id':deviceId
      }));

      try{
        let res = await fetch('http://api.nkhanhquoc.com/api/add-device',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          // body: formData
          body: JSON.stringify({
            'agent_id': agentId,
            'device_name': name,
            'device_id':deviceId
          }),
        });
        let resJson = await res.json();
        if(resJson.code == 0){
          console.log('pl_devicename: '+resJson.data.device_name);
          await AsyncStorage.removeItem('pl_devicename');
          await AsyncStorage.setItem('pl_devicename', resJson.data.device_name);
          let deviceName = await AsyncStorage.getItem('pl_devicename');
          if(deviceName != null){
            console.log('Set device name success. Redirect to Maps');
            this.props.navigation.navigate('ThisLocation',{
              deviceName:  resJson.data.device_name
            });
          }
          else {
            console.log('cant save AsyncStorage');
          }
        } else {
          console.log("ERROR: "+resJson.message);
        }
      }catch(e){
        console.error(e);
      }
    }
  render(){
    return(
      <View style={{flex:1, alignItems: 'center',justifyContent:'center'}}>
        <Text>Named Your Phone</Text>
        <TextInput style={{height:40,width:300}}
        placeholder='phonename' onChangeText={
          (phonename) => this.setState({phonename})
        }/>
        <Button onPress={() => this.onPressButton(this.state)} title="Save"/>
      </View>
    );
  }
}
