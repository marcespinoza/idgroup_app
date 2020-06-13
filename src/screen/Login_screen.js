import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Dimensions, Image, ActivityIndicator, TouchableOpacity, Modal} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../utils/Loader.js'
import { Snackbar,DefaultTheme,  } from 'react-native-paper';


const {width: WIDTH} = Dimensions.get('window')


export default class Login extends React.Component {

  constructor(){
      super();
      this.state={
        usuario:'',
        contraseña:'',
        validity:true,
        loading: false,
        showsnack: false
      }
  }
  

  _onToggleSnackBar = () => this.setState(showsnack => ({ visible: !showsnack.visible }));

  _onDismissSnackBar = () => this.setState({ showsnack: false });

   render() { return (
      <View style={styles.container}>
       <Loader  loading={this.state.loading} />
       <Snackbar
          visible={this.state.showsnack}
          onDismiss={this._onDismissSnackBar}
          duration={3000}
          style={styles.snack}
        >
          Datos incorrectos.
        </Snackbar>
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
          <TouchableOpacity onPress={this.login
            // () => this.props.navigation.navigate('Main')
          } 
              // disabled={(this.state.usuario == '' || this.state.contraseña == '')} 
              style={this.state.usuario == '' || this.state.contraseña == '' ? styles.button : styles.button }>
              <Text style={styles.setColorWhite}> INICIAR SESIÓN </Text>
          </TouchableOpacity>
          </View>
      </View>
    );
  }

  login = async =>{
    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const URL = 'http://admidgroup.com/api_rest/index.php/api/login';
    this.setState({loading:true});
    axios.post(URL, {
    dni: '31897311 ',
    clave: '12345',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Headers":"X-Requested-With"
    },
  })
  .then(function(response) {
    // handle success
    let resp = response.data;
    this.setState({loading:false});
    if(resp.status==true){
      this.props.navigation.navigate('Main')
    }else{
      this.setState({showsnack:true});
    }
  }.bind(this))
  .catch(function(error) {
    this.setState({loading:false});
    alert(error.response.request._response );
  }.bind(this));

}
}  
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      flex: 1,
      alignItems: 'center',
      justifyContent:'center'
    },
    snack:{
      color:'#ffffff',
      backgroundColor:'#D44942'
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
 activityIndicator: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
}
  });

