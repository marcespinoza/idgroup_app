import {loadAsync} from 'expo-font';
import * as Font from "expo-font";
import React, { Component } from "react";

export default class CustomFont extends Component {

    state = {
      loaded: false
    };
  // create a helper function to load the font 
    _loadFontsAsync = async () => {
      await Font.loadAsync({
        // add as many fonts as you want here .... 
        'roboto-medium': require('./assets/fonts/Roboto-Italic.ttf')
      });
      this.setState({ loaded: true });
    };
  
  // call _loadFontsAsyn
    componentDidMount() {
      this._loadFontsAsync();
    }
  
    render() {
      if (!this.state.loaded) {
        return <AppLoading />;
      }
      // from the custom App we return the component we assigned to RootApp.
      return <RootApp />;
    }
}
