import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Dimensions, Image,Form, Button , TouchableOpacity} from 'react-native';
import {loadAsync} from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width: WIDTH} = Dimensions.get('window')

export default class Login extends React.Component {

  state={
    usuario:'',
    contraseña:'',
    validity:true
  }

   render() { return (
      <View style={styles.container}>
           <Image style={styles.imagen} source={require('../../Images/id_group.png')} />
           <View style={styles.text_input}>          
             <View style={styles.logoContainer}>
             <Icon name="user" size={25} color="#000000" style={styles.inputIcon}/>
             <TextInput style={styles.input}   placeholder={'Usuario'} placeholderTextColor={'#626262'}
             onChangeText={(value)=>this.setState({usuario:value,validity:false})}
             value={this.state.usuario}/>
          </View>   
          <View style={styles.logoContainer}>
             <Icon name="lock" size={25} color="#000000" style={styles.inputIcon}/>
             <TextInput style={styles.input}  placeholder={'Contraseña'}  placeholderTextColor={'#626262'}
             onChangeText={(value)=>this.setState({contraseña:value,validity:false})}
             value={this.state.contraseña}/>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')} 
              // disabled={(this.state.usuario == '' || this.state.contraseña == '')} 
              style={this.state.usuario == '' || this.state.contraseña == '' ? styles.button : styles.button }>
              <Text style={styles.setColorWhite}> INICIAR SESIÓN </Text>
          </TouchableOpacity>
          </View>

      </View>
    );
  }

  onLoginButton() {  
    Alert.alert('You clicked the button!')  
}  
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
      borderBottomColor:'#c1c1c1',
      borderBottomWidth:1
    },
  
    imagen:{
      width: 200,
      height:200,
      top:50,      
      resizeMode: 'contain',
      transform: [{ scale: 0.85 }]
    },
    button: {
      alignItems: 'center', 
      justifyContent:'center',
      alignSelf:'center',
      height: 44,
      width: WIDTH - 55,
      backgroundColor:'#323232',
      padding:10,
      borderRadius:25,
      position: 'absolute',
      bottom:10
   },
   buttonDisabled: {
    alignItems: 'center', 
    justifyContent:'center',
    alignSelf:'center',
    height: 44,
    width: WIDTH - 55,
    backgroundColor:'#c1c1c1',
    padding:10,
    borderRadius:25,
    position: 'absolute',
    bottom:10
 },
  });

