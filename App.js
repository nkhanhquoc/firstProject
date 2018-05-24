/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import CurrentLocation from './src/CurrentLocation.js';
import { Button, View, Text,TextInput,Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class MapScreen extends Component{
  render(){
    return (
      <CurrentLocation />
    )
  }
}

class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      valid:false
    };
  }
  render(){
    return(
      <View style={{flex:1, alignItems: 'center',justifyContent:'center'}}>
        <TextInput  style={{height:40,width:300}}
        placeholder='email exp: jonhdoe@example.com'
        onChangeText={(text) => this.setState({text})}
        keyboardType='email-address'
        />
        <TextInput style={{height:40,width:300,paddingTop:10}}
        placeholder='secret password'
        onChangeText={(password) => this.setState({password})}
        secureTextEntry={true}
        />
        <Button onPress={this._onPressButton} title="Login"/>
      </View>
    )
  }

  _onPressButton(){
    Alert.alert('you tapped the button!')
  }

}


const RouteStack = createStackNavigator(
  {
    Home: HomeScreen,
    Maps: MapScreen
  }
);


export default class App extends Component{
  render(){
    return(
      <HomeScreen/>
    )
  }
}





// export default class App extends Component<Props>{

  // render() {
  //   return (
  //     <View style={{flex:1, flexDirection: 'column'}}>
  //       <View style={{flex:1,backgroundColor:'powderblue'}}><TextGreetings name='Khánh Toong'/></View>
  //       <View style={{flex:2,backgroundColor:'skyblue'}}><TextGreetings name='Hiền Toong'/></View>
  //       <View style={{flex:3,backgroundColor:'steelblue'}}><TextGreetings name='Nguyên Toong'/></View>
  //     </View>
  //   );
  // }
  // constructor(props){
  //   super(props);
  //   this.state = {text:''};
  // }
  // render(){
  //   return (
  //     <View style={{padding:10}}>
  //       <TextInput style={{height:40}}
  //       placeholder="nhập từ khóa để translate"
  //       onChangeText={(text) => this.setState({text})}
  //       />
  //       <Text style={{padding:10, fontSize:40}}>
  //         {this.state.text.split(' ').map((word) => word && 'abc').join(' ')}
  //       </Text>
  //     </View>
  //   )
  // }
  // _onPressButton(){
  //   Alert.alert('you tapped the button!')
  // }
  //
  // _onLongPressButton(){
  //   Alert.alert('you long-press the button!')
  // }
  // render(){
  //   return(
  //     <View style={styles.container}>
  //       <View style={styles.buttonContainer}>
  //         <Button onPress={this._onPressButton} title="Press me"/>
  //       </View>
  //       <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
  //         <View style={styles.button}>
  //           <Text style={styles.buttonText}>TouchableHighlight</Text>
  //         </View>
  //       </TouchableHighlight>
  //       <TouchableOpacity onPress={this._onPressButton}>
  //         <View style={styles.button}>
  //           <Text style={styles.buttonText}>TouchableOpacity</Text>
  //         </View>
  //       </TouchableOpacity>
  //       <TouchableNativeFeedback
  //           onPress={this._onPressButton}
  //           background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
  //         <View style={styles.button}>
  //           <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
  //         </View>
  //       </TouchableNativeFeedback>
  //       <TouchableWithoutFeedback
  //           onPress={this._onPressButton} onLongPress={this._onLongPressButton}
  //           >
  //         <View style={styles.button}>
  //           <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
  //         </View>
  //       </TouchableWithoutFeedback>
  //       <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
  //         <View style={styles.button}>
  //           <Text style={styles.buttonText}>Touchable with Long Press</Text>
  //         </View>
  //       </TouchableHighlight>
  //     </View>
  //   )
  // }

  // render(){
  //   return(
  //     <View style={styles.container}>
  //       <SectionList
  //           sections={[
  //             {title: 'D', data: ['Devin']},
  //             {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
  //           ]}
  //           renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
  //           renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
  //           keyExtractor={(item, index) => index}
  //         />
  //       <FlatList
  //         data={[
  //           {key: '1'},
  //           {key: '2'},
  //           {key: '3'},
  //           {key: '4'},
  //           {key: '5'},
  //           {key: '6'},
  //           {key: '7'},
  //           {key: '8'},
  //           {key: '9'},
  //           {key: '10'},
  //           {key: '11'},
  //           {key: '12'},
  //           {key: '13'},
  //         ]}
  //         renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
  //       />
  //
  //     </View>
  //   )
  // }
  // constructor(props){
  //   super(props);
  //   this.state = {isLoading:true}
  // }
  // componentDidMount(){
  //   return fetch('https://facebook.github.io/react-native/movies.json')
  //   .then((response) => response.json())
  //   .then((responseJson)=>{
  //     this.setState({
  //       isLoading:false,
  //       dataSource:responseJson.movies,
  //     }, function(){});
  //   })
  //   .catch((error)=>{
  //     console.error(error);
  //   });d
  // }
//   render(){
//     if(this.state.isLoading){
//       return(
//         <View style={{flex:1, padding:20}}>
//           <ActivityIndicator/>
//         </View>
//       )
//     }
//     return(
//     <GeoExample/>
//     )
//   }
// }

// class TextGreetings extends Component{
//   render(){
//     return(
//       <Text>Hello {this.props.name}!!!</Text>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop:22,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: '#F5FCFF',
//     backgroundColor: 'skyblue',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     margin: 20
//   },
//   buttonText: {
//     padding: 20,
//     color: 'white'
//   },
//   button: {
//     marginBottom: 30,
//     width: 260,
//     alignItems: 'center',
//     backgroundColor: '#2196F3'
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 55,
//   },
//   sectionHeader: {
//     paddingTop: 2,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 2,
//     fontSize: 14,
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(247,247,247,1.0)',
//   },
//   map: {
//     flex: 1,
//     width,
//     height
//   }
// });
