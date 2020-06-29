import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Dimensions, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Button} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../utils/Loader.js'
import { Snackbar,DefaultTheme,  } from 'react-native-paper';
import * as yup from 'yup'
import { Formik } from 'formik'

const {width: WIDTH} = Dimensions.get('window')
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Login extends React.Component {

  constructor(){
      super();
      this.state={
        usuario:'',
        contraseña:'',
        validity:true,
        loading: false,
        showsnack: false,
        btnLocation:0
      }
  }
 

  _onToggleSnackBar = () => this.setState(showsnack => ({ visible: !showsnack.visible }));

  _onDismissSnackBar = () => this.setState({ showsnack: false });

   render() { return (
    <Formik
    initialValues={{ 
      documento: '',
      clave: '',
    }}
    onSubmit={values => Alert.alert(JSON.stringify(values))}
    validationSchema={yup.object().shape({
      documento: yup
        .string()
        .required('Please, provide your name!'),
      clave: yup
        .string()
        .min(4)
        .max(10, 'Password should not excced 10 chars.')
        .required(),
    })}
   >
    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
      <View style={styles.container}>
       <Loader  loading={this.state.loading} mensaje={'Iniciando sesión..'}/>
       <Snackbar
          visible={this.state.showsnack}
          onDismiss={this._onDismissSnackBar}
          duration={3000}
          style={styles.snack} >
          Usuario/contraseña incorrecto/a.
        </Snackbar>
          <Image style={styles.imagen} source={require('../../Images/id_group.png')} />
          
             <View style={styles.logoContainer}>
             <Icon name="user" size={25} color="#000000" style={styles.inputIcon}/>
             <TextInput 
               value={values.documento}
               style={styles.input}
               onChangeText={handleChange('documento')}
               onBlur={() => setFieldTouched('documento')}
               placeholder="Documento"
             />
              {touched.documento && errors.documento &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.documento}</Text>
            }
          </View>   
          
          <View style={styles.logoContainer2}>
             <Icon name="lock" size={25} color="#000000" style={styles.inputIcon}/>
             <TextInput   value={values.clave}
             style={styles.input}
              onChangeText={handleChange('clave')}
              onBlur={() => setFieldTouched('clave')}
              placeholder="Contraseña"/>              
          </View>
          {touched.clave && errors.clave &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.clave}</Text>
            }
          
          <TouchableOpacity onPress={handleSubmit }   style={this.state.usuario == '' || this.state.contraseña == '' ? styles.buttonLogin : styles.buttonLogin }>
              <Text style={styles.setColorWhite}> INICIAR SESIÓN </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register') } 
              style={this.state.usuario == '' || this.state.contraseña == '' ? styles.buttonRegister : styles.buttonRegister }>
              <Text style={{color:'#323232', fontFamily:'roboto-black'}}> REGISTRARME </Text>
          </TouchableOpacity>
          </View>
           )}
           </Formik>
    );
  }

  login = async =>{
    // const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const URL = 'http://admidgroup.com/api_rest/index.php/api/login';
    this.setState({loading:true});
    axios.post(URL, {
    dni: this.state.usuario,
    clave: this.state.contraseña,
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
   }.bind(this));

}
}  
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      flex: 1,
      alignItems:'center'
    },
    snack:{
      color:'#ffffff',
      backgroundColor:'#D44942'
    },
    text_input:{
      left:0,
      right:0,
      bottom:0,
    },
    setColorWhite:{
      color:'#ffffff',
    },
    logoContainer:{
      marginTop:10,
      paddingBottom:10
    },
    logoContainer2:{
      marginBottom:10,
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
      borderBottomWidth:1,
    },
  
    imagen:{
      width: 200,
      height:200,
      resizeMode: 'contain',
      alignSelf:'center',
      transform: [{ scale: 0.85 }]
    },
    buttonLogin: {
      alignItems: 'center', 
      justifyContent:'center',
      alignSelf:'center',
      height: 44,
      width: WIDTH - 125,
      backgroundColor:'#323232',
      padding:20,
      borderRadius:25,
      bottom:10,
      marginTop:30
   },
   buttonRegister: {
    alignItems: 'center', 
    justifyContent:'center',
    alignSelf:'center',
    height: 44,
    width: WIDTH - 55,
    padding:10,
    bottom:5
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

