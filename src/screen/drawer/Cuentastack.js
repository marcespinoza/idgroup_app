import React from 'react';
import { Button, View, Text, StyleSheet, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Cuenta from '../drawer/Cuenta.js'
import Icon from 'react-native-vector-icons/FontAwesome';

const CuentaStack = createStackNavigator();

const CuentaScreen = ({navigation}) => {
  return(
      <CuentaStack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor: '#fff'
        },
        headerTintColor:'#323232',
        headerTitleStyle:{
          fontWeight:'bold'
        }
      }}>
        <CuentaStack.Screen name='Cuenta' component={Cuenta} options={{
          title:'Estado de Cuenta',
          headerLeft:()=>(
            <Icon name='bars' style={{ marginLeft: 10 }}  size={30} backgroundColor='#ffffff'
            onPress={() => {navigation.openDrawer()}}>

            </Icon>
          )
        }}

        />
      </CuentaStack.Navigator>);
  };
  

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });

  export default CuentaScreen;
