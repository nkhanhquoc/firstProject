import React, { Component } from 'react';
import { Button, View, Text,AsyncStorage,TextInput } from 'react-native';

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
  async onPressButton(val,navi){
      let name = val.phonename.trim();
      console.log(name);
      let deviceId = DeviceInfo.getUniqueID();
      let agentId = AsyncStorage.get('token');

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
          // .then(() => this.props.navigation.navigate('Maps'));
          let deviceName = await AsyncStorage.getItem('pl_devicename');
          if(deviceName != null){
            console.log('redirect to Maps');
            this.props.navigation.navigate('ThisLocation');
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
        <TextInput style={{height:40,width:300}}
        placeholder='phonename'
        onChangeText={
          (phonename) => this.setState({phonename})
        }
        />
        <Button onPress={() => this.onPressButton(this.state,navi)} title="Save"/>
      </View>
    );
  }
}
