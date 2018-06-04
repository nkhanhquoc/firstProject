/**
 * @Author: Nguyen Quoc Khanh <nkhanhquoc>
 * @Date:   22-May-2018
 * @Email:  nkhanhquoc@gmail.com
 * @Project: {ProjectName}
 * @Filename: App.js
 * @Last modified by:   Nguyen Quoc Khanh
 * @Last modified time: 04-Jun-2018
 * @Copyright: by nkhanhquoc@gmail.com
 */


import React, { Component } from 'react';
import LoginScreen from './src/Login.js';
import LogoutScreen from './src/Logout';
import SetupPhone from './src/SetupPhone';
import CurrentLocation from './src/CurrentLocation.js';
import DeviceLocation from './src/DeviceLocation';
import { AsyncStorage,StatusBar,View,ActivityIndicator } from 'react-native';
import { createStackNavigator,createSwitchNavigator,createDrawerNavigator } from 'react-navigation';

class AuthLoadingScreen extends Component{
  constructor(props){
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async() => {
    let token = await AsyncStorage.getItem('token');
    console.log("token: "+token);
    this.props.navigation.navigate(token? 'ThisLocation':'Login');
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

const AppStack = createDrawerNavigator(
  {
    ThisLocation: {
      drawerLabel: 'Your Location',
      screen: CurrentLocation },
    Device: { screen: DeviceLocation },
    Logout: { screen: LogoutScreen }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Setup: SetupPhone
  },
  {
    initialRouteName: 'Login',
  }
);

export default App = createSwitchNavigator(
  {
    Init: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Init',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
    }
  }
);


// export default class App extends Component<Props>{
//
//   render() {
//     return (
//       <View style={{flex:1, flexDirection: 'column'}}>
//         <View style={{flex:1,backgroundColor:'powderblue'}}><TextGreetings name='Khánh Toong'/></View>
//         <View style={{flex:2,backgroundColor:'skyblue'}}><TextGreetings name='Hiền Toong'/></View>
//         <View style={{flex:3,backgroundColor:'steelblue'}}><TextGreetings name='Nguyên Toong'/></View>
//       </View>
//     );
//   }
//   }
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
  //   });
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
