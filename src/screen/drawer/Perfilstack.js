import React from 'react';
import { Button, View, Text, StyleSheet, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Perfil from './Perfil.js'
import Icon from 'react-native-vector-icons/FontAwesome';

const PerfilStack = createStackNavigator();

const PerfilScreen = ({navigation}) => {
  return(
      <PerfilStack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor: '#fff'
        },
        headerTintColor:'#323232',
        headerTitleStyle:{
          fontWeight:'100'
        }
      }}>
        <PerfilStack.Screen name='Perfil' component={Perfil} options={{
          title:'Mis datos',
          headerLeft:()=>(
            <Icon name='bars' style={{ marginLeft: 10 }}  size={30} backgroundColor='#ffffff'
            onPress={() => {navigation.openDrawer()}}>

            </Icon>
          )
        }}

        />
      </PerfilStack.Navigator>);
  };
  

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });

  export default PerfilScreen;
