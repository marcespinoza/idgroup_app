import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Image,Form, Button , TouchableOpacity} from 'react-native';
import {loadAsync} from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width: WIDTH} = Dimensions.get('window')


   const LoginScreen = () => { return (
      <View style={styles.container}>
           <Image style={styles.imagen} source={require('../../Images/id_group.png')} />
           <View style={styles.text_input}>          
             <View style={styles.logoContainer}>
             <Icon name="user" size={25} color="#000000" style={styles.inputIcon}/>
             <TextInput style={styles.input}   placeholder={'Usuario'} placeholderTextColor={'#626262'}/>
          </View>   
          <View style={styles.logoContainer}>
             <Icon name="lock" size={25} color="#000000" style={styles.inputIcon}/>
             <TextInput style={styles.input}  placeholder={'Contraseña'}  placeholderTextColor={'#626262'}/>
          </View>
          <TouchableOpacity
            style={styles.button}>
          <Text style={styles.setColorWhite}> INICIAR SESIÓN </Text>
          </TouchableOpacity>
          </View>

      </View>
    );
  }
   
  
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
       alignItems: 'center'
    },

    text_input:{
      flex: 1,
      justifyContent: 'center',
    },
    setColorWhite:{
      color:'#ffffff',
    },
    logoContainer:{
      marginTop:10
    },
    inputIcon:{
      position: "absolute",
      top:10,
      left:37
    },
    input:{
      marginHorizontal:25,
      fontSize: 16,
      paddingLeft:45,
      height: 44,
      width: WIDTH - 55,
      borderBottomColor:'#323232',
      borderBottomWidth:1
    },
  
    imagen:{
      width: 200,
      height:200,
      top:40,      
      resizeMode: 'contain',
      transform: [{ scale: 0.85 }]
    },
    button: {
      alignItems: 'center', 
      justifyContent:'center',
      alignSelf:'center',
      height: 44,
      width: WIDTH - 55,
      top:20,
      backgroundColor:'#323232',
      borderColor:'#323232',
      borderWidth:1,
      padding:10,
      borderRadius:25
   },
  });

  export default LoginScreen;