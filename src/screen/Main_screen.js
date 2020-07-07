import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import CuentaScreen from './drawer/Cuentastack.js';
import RegisterScreen from '../screen/Register_screen.js'
import DrawerContent from '../screen/DrawerContent.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import PerfilScreen from '../screen/drawer/Perfil.js'


const Drawer = createDrawerNavigator();

function DrawerScreen  (props) {

  return(
  <Drawer.Navigator
   drawerContent={(props)=> <DrawerContent {...props}/>}
    initialRouteName="Home"    >
    <Drawer.Screen name="Home" component={CuentaScreen}/>
    <Drawer.Screen name="Perfil" component={PerfilScreen}  />
  </Drawer.Navigator>
  )
};  


export default (props) => {
  const { state} = props.navigation;
return (
    <NavigationContainer>
      <DrawerScreen screenProps={{usuario: state.params}}/>
    </NavigationContainer>
);
}

const  styles = StyleSheet.create({
  container: {
    flex:1
  }
})
