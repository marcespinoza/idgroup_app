import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Image } from 'react-native';
import {loadAsync} from 'expo-font';
import * as Font from "expo-font";

const {width: WIDTH} = Dimensions.get('window')


   const LoginScreen = () => { return (
      <View style={styles.container}>
        <Image style={styles.imagen} source={require('../../Images/logo_login.jpg')} />
          <TextInput style={styles.input}
          placeholder={'Usuario'}/>
          <TextInput style={styles.input}
          placeholder={'Contraseña'}/>
          <Text style={styles.boton_login}>Iniciar sesión</Text>
      </View>
    );
  }
   
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    input:{
      marginHorizontal:25,
      fontSize: 16,
      paddingLeft:45,
      margin: 10,
      height: 45,
      width: WIDTH - 55,
      borderRadius: 25,
      backgroundColor: 'rgba(221,221,221,0.2)',
    },
  
    imagen:{
      width: 200,
      height:200,
    },
  
    boton_login:{
        marginTop:20,
        fontFamily:'roboto-black'
    }
  
  });

  export default LoginScreen;