import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar  } from 'react-native';
import {loadAsync} from 'expo-font';
import * as Font from "expo-font";
import LoginScreen from "./src/screen/Login_screen.js";


export default class App extends React.Component {
  state = {
    assetsLoaded: false,
};
  async componentDidMount() {
    await Font.loadAsync({
        'roboto-black': require('./assets/fonts/Roboto-Black.ttf')
    });
    this.setState({ assetsLoaded: true });
}

  render() {
    const {assetsLoaded} = this.state;  
    if( assetsLoaded ) {
      return(
      <View style={styles.container}>
        <LoginScreen/>
      </View>
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