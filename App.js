import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar  } from 'react-native';
import {loadAsync} from 'expo-font';
import * as Font from "expo-font";
import Login from "./src/screen/Login_screen.js";
import Main from "./src/screen/Main_screen.js";
import RegisterScreen from './src/screen/Register_screen.js'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import {useNavigation } from '@react-navigation/native';


const AppNavigator = createStackNavigator(
  {
  LoginScreen: { screen: Login },
  Main: { screen: Main },
  Register: {screen: RegisterScreen}
  },
  {
    headerMode: 'none',
  },
  {
    initialRouteName: 'LoginScreen',
    }
);

const Appcontainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  state = {  
    assetsLoaded: false,
};
  async componentDidMount() {
    await Font.loadAsync({
        'roboto-black': require('./assets/fonts/Roboto-Black.ttf'),
        'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
        'roboto-thin': require('./assets/fonts/Roboto-Thin.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf')
    });
    this.setState({ assetsLoaded: true });
}

  render() {

    const {assetsLoaded} = this.state;  
    if( assetsLoaded ) {
      return(
         <Appcontainer />
    );
  }else{
    return (
      <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
      </View>
  );
   }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
})
