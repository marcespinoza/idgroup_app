import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Image } from 'react-native';
import {loadAsync} from 'expo-font';
import * as Font from "expo-font";
import LoginScreen from "./src/screen/Login_screen.js";


export default class App extends React.Component {

  async componentDidMount() {
    await Font.loadAsync({
        'roboto-black': require('./assets/fonts/Roboto-Black.ttf')
    });
}

  render() {
    return (
      <View style={styles.container}>
        <LoginScreen/>
      </View>
    );
  }

  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },})