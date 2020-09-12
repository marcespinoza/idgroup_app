import React,{ useRef,useState, useEffect } from 'react';
import {AsyncStorage, StyleSheet, Text, View, TextInput, Dimensions, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Button} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../utils/Loader.js'
import { Snackbar,DefaultTheme,  } from 'react-native-paper';
import * as yup from 'yup'
import { Formik } from 'formik'
import NetworkUtils from './../utils/NetworkUtils'
import { BackHandler } from "react-native";


const { width, height } = Dimensions.get('window')
const screenHeight = Math.round(Dimensions.get('window').height);
const windowHeight = Dimensions.get('window').height;

export default function Login(props) {

  const [data, setData] = React.useState({
        usuario:'',
        contraseña:'',
        btnLocation:0,
      })

  const [loading,setLoadingState] = useState(false);
  const [showsnack,setSnack] = useState(false);
  const [mensaje_error,setMensajeError] = useState('');
  const formRef = useRef();
  const [hidePass, setHidePass] = useState(true);


  useEffect(() => {     
    checkLogin()
  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => { BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, []);

  const backButtonHandler = () => {
    BackHandler.exitApp()
  }

  const checkLogin = async() =>{
    let log = await AsyncStorage.getItem("login")
    let data = JSON.parse(log);
    console.log(data)
        if(data==='true'){
          props.navigation.navigate('Main')
        }
  }

  const _onDismissSnackBar = () => setSnack(false);

  const _storeData = async (items) => {
    try {
      await AsyncStorage.setItem('login', JSON.stringify('true'));
      AsyncStorage.multiSet(items, err => {
      });
    } catch (error) {
       console.log(error.message);
    }
  }
  
    return (
     
    <Formik
    initialValues={{ 
      documento: '',
      clave: '',
    }}
    innerRef={formRef}
    onSubmit={loginuser}
    validationSchema={yup.object().shape({
      documento: yup
        .string()
        .required('Ingrese su número de documento'),
      clave: yup
        .string() 
        .required('Ingrese su contraseña'),
    })}
   >
    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView  behavior='padding' style={styles.container}>  
       <Loader  loading={loading} mensaje={'Iniciando sesión..'}/>       
          <Image style={styles.imagen} source={require('../../Images/id_group.png')} />            
             <View style={styles.logoContainer}>

             <Icon name="user" size={25} color="#000000" style={styles.inputIcon}/>
             <TextInput 
               value={values.documento}
               style={styles.input}
               keyboardType='numeric'
               onChangeText={handleChange('documento')}
               onBlur={() => setFieldTouched('documento')}
               placeholder="Documento" />             
          </View> 
          <View style={{height:12}}>
              {touched.documento && errors.documento &&              
              <Text style={{ fontSize: 10, color: 'red'}}>{errors.documento}</Text>
            }</View>  
          
          <View style={styles.logoContainer2}>
             <Icon name="lock" size={25} color="#000000" style={styles.inputIcon}/>
             <TextInput   value={values.clave}
              style={styles.input}
              onChangeText={handleChange('clave')}
              onBlur={() => setFieldTouched('clave')}
              secureTextEntry={hidePass ? true : false}
              placeholder="Contraseña"/>        
               <Icon
              name={hidePass ? 'eye-slash' : 'eye'}
              size={22}
              color="grey"
              onPress={() => setHidePass(!hidePass)}
              style={{position: "absolute",
              top:15,
              right:37}}
            />      
          </View>
          <View style={{height:12}}>
          {touched.clave && errors.clave &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.clave}</Text>}
          </View>
          </KeyboardAvoidingView>  
          </ScrollView>
          <TouchableOpacity onPress={() => 
            handleSubmit()
        //      props.navigation.navigate('Main',
        //  {
        //   usuario: "resp.nombre + resp.apellido",
        //   })
        }   style={data.usuario == '' || data.contraseña == '' ? styles.buttonLogin : styles.buttonLogin }>
              <Text style={styles.setColorWhite}> INICIAR SESIÓN </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Register') } 
              style={data.usuario == '' || data.contraseña == '' ? styles.buttonRegister : styles.buttonRegister }>
              <Text style={{color:'#323232', fontFamily:'roboto-medium'}}> REGISTRARME </Text>

          </TouchableOpacity>
          <Snackbar
           visible={showsnack}
           onDismiss={_onDismissSnackBar}
           duration={3000}
           style={styles.snack} >
            {mensaje_error}
        </Snackbar>
          </View>
           )}
           </Formik>
    );
  
    async function loginuser(){
      const isConnected = await NetworkUtils.isNetworkAvailable()
      if(isConnected){
      const URL = 'https://admidgroup.com/api_rest/index.php/api/login';
      setLoadingState(true);
      axios.post(URL, {
      dni: formRef.current.values.documento,
      clave: formRef.current.values.clave,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers":"X-Requested-With"
      },
    })
    .then(function(response) {
      // handle success
      let resp = response.data;
      setLoadingState(false);
      if(resp.status==true){
        props.navigation.navigate('Main',
        {
          usuario: resp.nombre + resp.apellido,
        })
        let items = [['nombre', resp.nombre], ['apellido', resp.apellido], ['documento', resp.documento], ['direccion', resp.direccion]
        , ['telefono', resp.telefono], ['fecha_nacimiento', resp.fecha_nacimiento], ['interes', resp.interes], ['ocupacion', resp.ocupacion]
        , ['correo', resp.correo],['idcontrol',  resp.idcliente],['clave',  resp.clave],['fecha_ocupacion',  resp.fecha_ocupacion]];

        _storeData(items)
      formRef.current.resetForm()
      }else{
        setMensajeError('Usuario/contraseña incorrecto/a')
        setSnack(true);
      }
    }.bind(this))
    .catch(function(error) {
      setLoadingState(false);
      setMensajeError('Error al enviar datos')
      setSnack(true);
      console.log(error)
     }.bind(this));    
    } else{
      setMensajeError('Revise su conexión')
      setSnack(true);
    }
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
      backgroundColor:'#D44942',
      alignItems:'center'
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
      marginTop:height*0.07,
    },
    logoContainer2:{
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
      width: width - 55,
      borderBottomColor:'#c1c1c1',
      borderBottomWidth:1,
    },
  
    imagen:{
      width: 200,
      height:200,
      marginTop:height*0.07,
      resizeMode: 'contain',
      alignSelf:'center',
      transform: [{ scale: 0.85 }]
    },
    buttonLogin: {
      alignItems: 'center', 
      justifyContent:'center',
      alignSelf:'center',
      height: 44,
      width: width - 125,
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
    width: width - 55,
    padding:10,
    bottom:5
 },
   buttonDisabled: {
    alignItems: 'center', 
    justifyContent:'center',
    alignSelf:'center',
    height: 44,
    width: width - 55,
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

