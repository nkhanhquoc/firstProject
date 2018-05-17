/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props>{
  constructor(props){
    super(props);
    this.state = {text:''};
  }
  // render() {
  //   return (
  //     <View style={{flex:1, flexDirection: 'column'}}>
  //       <View style={{flex:1,backgroundColor:'powderblue'}}><TextGreetings name='Khánh Toong'/></View>
  //       <View style={{flex:2,backgroundColor:'skyblue'}}><TextGreetings name='Hiền Toong'/></View>
  //       <View style={{flex:3,backgroundColor:'steelblue'}}><TextGreetings name='Nguyên Toong'/></View>
  //     </View>
  //   );
  // }
  render(){
    return (
      <View style={{padding:10}}>
        <TextInput style={{height:40}}
        placeholder="nhập từ khóa để translate"
        onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding:10, fontSize:40}}>
          {this.state.text.split(' ').map((word) => word && 'abc').join(' ')}
        </Text>
      </View>
    )
  }
}

class TextGreetings extends Component{
  render(){
    return(
      <Text>Hello {this.props.name}!!!</Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: 'skyblue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
