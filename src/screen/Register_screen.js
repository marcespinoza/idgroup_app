import React ,{useState, useEffect, useRef}from 'react';
import { BackHandler } from "react-native";
import { 
    View, 
    Text, 
    Dimensions, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    ImageBackground,
    Image,
    Animated, Easing
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import SnackBar from 'react-native-snackbar-component'


import axios from 'axios';
import moment from 'moment';
import { Input } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text'
import LabelSelect from '../utils/LabelSelect';
import Loader from '../utils/Loader.js'
import * as yup from 'yup'
import { Formik, yupToFormErrors } from 'formik'
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
  } from 'react-native-modals';
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { number } from 'prop-types';


const {width: WIDTH} = Dimensions.get('window')

const RegisterScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        nombre: '',
        apellido: '',
        documento: '',
        correo:'',
        interes:[],
        contraseña:'',
        confirma_contraseña:'',
        check_nametextInputChange: false,
        check_lastnametextInputChange: false,
        check_idtextInputChange: false,
        secureTextEntry: true,
        NameErrorMessage:'',
        LastNameErrorMessage:'',
        IdErrorMessage:'',
        PassErrorMessage:'',
        ConfirmPassErrorMessage:'',
        showDropDown: false,
        loading: false,
        modal_:false,
        progress:new Animated.Value(0),
    });

   const formRef = useRef();

   const opciones = [{
        name: 'Educación',
        isSelected: false,
        value: 1
      }, {
        name: 'Deportes',
        isSelected: false,
        value: 2
      }, {
        name: 'Tecnologia',
        isSelected: false,
        value: 3
      }, {
        name: 'Politica',
        isSelected: false,
        value: 4
      }];


   async function registro() {
       let interes_ = []
            items.map((y) => {
              if(y.isSelected==true){
                 interes_.push(y.name)
              }
          })
        const URL = 'https://admidgroup.com/api_rest/index.php/api/cliente';
        setData({
            ...data,
            loading:true
        });
        axios.post(URL, {
        nombre: formRef.current.values.nombre,
        apellido: formRef.current.values.apellido,
        correo: formRef.current.values.correo,
        direccion:formRef.current.values.direccion,
        ocupacion: formRef.current.values.ocupacion,
        telefono:formRef.current.values.telefono,
        fecha_ocupacion: moment(formRef.current.values.fecha_ocupacion, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        documento: formRef.current.values.documento,
        fecha_nacimiento: moment(formRef.current.values.fecha_nacimiento, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        interes: interes_,
        clave: formRef.current.values.contraseña,
      })
      .then(function(response) {
        if(response.data.codigo==201){
              
        Animated.timing(data.progress, {
          toValue: 1,
          duration: 2500,
          easing: Easing.linear,
        }).start();
      }
      setData({
        ...data,
        loading:false,
        modal_:true,
    });  
    console.log(response.data)
      }.bind(this))
      .catch(function(error) {
        setData({
            ...data,
            loading:false
        });
        console.log(error)
        setMensajesnack('Error al registar')
        setShowsnack(true)
       }.bind(this));
    
    }

    const onChangedDocumento = (text) => {
      this.setState({
          mobile: text.replace(/[^0-9]/g, ''),
      });
  }

    const [nacimiento, setNacimiento] = useState('');
    const [statemodal, showModal] = useState(false);
    const [showsnack, setShowsnack] = useState(false)
    const [mensajesnack, setMensajesnack] = useState('')
    const [items, setInteres] = useState([]);
    useEffect(() => {
        setInteres(opciones);
        
      }, []);      

      useEffect(() => {
    if(data.modal_){
       BackHandler.addEventListener("hardwareBackPress", () => true);
       return () => {
       BackHandler.removeEventListener("hardwareBackPress", () => true);
    };
        }
        
      }, [data.modal_]);    

         const selectConfirm=(list)=> {
            let items2 = [...items];
            let seleccionados = [];
            for (let item of list) {
              let index = items2.findIndex(ele => ele === item);
              if (~index)
                items2[index].isSelected = true;              
               else continue;
            }
            for (let item of items2) {
              if(item.isSelected){
                seleccionados=item 
              }              
            }            
            setInteres(items2)
            
          
          }

         const deleteItem=(item)=> {
            let items2 =[...items]; 
            let index = items2.findIndex(a => a === item);
            items2[index].isSelected = false;
            setInteres(items2);
          }

               
        function closeScreen() {
          setData({
            ...data,
            modal_:false
        });
          navigation.navigate('LoginScreen')
        };


    return (
        <Formik
    initialValues={{ 
      nombre: '',
      apellido: '',
      correo:'',
      direccion:'',
      telefono:'',
      ocupacion:'',
      documento:'',
      fecha_nacimiento:'',
      interes:'',
      contraseña:'',
      confirma_contraseña:''
    }}
    innerRef={formRef}
    onSubmit={registro}
    validationSchema={yup.object().shape({
        nombre: yup
        .string()
        .required('Este campo es obligatorio'),
        apellido: yup
        .string() 
        .required('Este campo es obligatorio'),
        direccion: yup
        .string() 
        .required('Este campo es obligatorio'),
        correo: yup
        .string() 
        .email("Ingrese un correo válido")
        .required('Este campo es obligatorio'),
        telefono: yup
        .string() 
        .required('Este campo es obligatorio'),
        ocupacion: yup
        .string() 
        .required('Este campo es obligatorio'),
        fecha_ocupacion: yup
        .date(),
        documento: yup
        .number()
        .typeError("Ingrese solo numeros")
        .required('Este campo es obligatorio'),
        fecha_nacimiento:
         yup.string().
         required('Este campo es obligatorio'),
        contraseña: yup
        .string()
        .min(5,'Mínimo 5 caracteres')
        .max(10,'Máximo 10 caracteres') 
        .required('Este campo es obligatorio'),
        confirma_contraseña: yup
        .string() 
        .min(5,'Mínimo 5 caracteres')
        .max(10,'Máximo 10 caracteres')
        .required('Este campo es obligatorio')
        .label('Confirm password')
        .test('passwords-match', 'Las contraseñas deben coincidir', function(value) {
        return this.parent.contraseña === value;
        }),
    })}  >
    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, setFieldValue, resetForm }) => (
      <View style={styles.container}>
        <ImageBackground  source={require('../../Images/fondoregister.jpg')} style={styles.backgroundImage} >

          <StatusBar backgroundColor='#20b1e8' barStyle="light-content"/>
          <Loader  loading={data.loading} mensaje={'Registrando usuario..' }/>
          <Modal
            animationType = {"slide"}
            transparent={false}
            visible={data.modal_}
            onRequestClose={() => {
            }}>
              <View style={{alignItems:'center', padding:10}}>
        <LottieView
         source={require('../../Images/check2.json')}   
         progress={data.progress}
            
         style={{ width: 60, height: 60 , alignSelf:'center'}}
          resizeMode="cover"   />
              <Text style = { styles.text }>
                  Se ha registrado correctamente</Text>
           <TouchableOpacity style={{}} onPress={closeScreen } >
              <Text style={{color:'#AAAAAA', fontFamily:'roboto-black', margin:8}}> VOLVER AL INICIO </Text>
          </TouchableOpacity>
          </View>
          </Modal>
          <SnackBar visible={showsnack} textMessage={mensajesnack} autoHidingTime={3000} backgroundColor="#FF3333" position="top" actionText="let's go"/>

        <View style={styles.header}>
            <Text style={styles.text_header}>Bienvenido!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig" delay={800}
            style={styles.footer}   >
            <ScrollView>                
            <View>
               <TextInput
                 value={values.nombre}
                 style={styles.input}
                 placeholder="Nombre/s"
                 inputContainerStyle={{ borderColor: '#EAEAEA' }}
                 onChangeText={handleChange('nombre')}
                 onBlur={() => setFieldTouched('nombre')}  />
           </View>
           <View style={{height:12, alignItems:'center'}}>
              {touched.nombre && errors.nombre &&              
              <Text style={{ fontSize: 10, color: 'red'}}>{errors.nombre}</Text>
            }</View>
            <View >
            <TextInput
              placeholder="Apellido/s"
              value={values.apellido}
              style={styles.input}
              inputContainerStyle={{ borderColor: '#EAEAEA' }}
              onChangeText={handleChange('apellido')}
               onBlur={() => setFieldTouched('apellido')} 
             />
            </View>
            <View style={{height:12, alignItems:'center'}}>
              {touched.apellido && errors.apellido &&              
              <Text style={{ fontSize: 10, color: 'red'}}>{errors.apellido}</Text>
            }</View>
            {/*------Correo----------*/}
            <View >
            <TextInput
            placeholder="Correo"
            value={values.correo}
            style={styles.input}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}
            onChangeText={handleChange('correo')}
               onBlur={() => setFieldTouched('correo')} />
            </View>
            <View style={{height:12, alignItems:'center'}}>
              {touched.correo && errors.correo &&              
              <Text style={{ fontSize: 10, color: 'red'}}>{errors.correo}</Text>
            }</View>
            {/*------Dirección------------*/}
            <View >
            <TextInput
            placeholder="Dirección"
            value={values.direccion}
            style={styles.input}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}
            onChangeText={handleChange('direccion')}
               onBlur={() => setFieldTouched('direccion')} />
            </View>
            <View style={{height:12, alignItems:'center'}}>
              {touched.direccion && errors.direccion &&              
              <Text style={{ fontSize: 10, color: 'red'}}>{errors.direccion}</Text>
            }</View>
            {/*------Telefono------------*/}
            <View >
            <TextInput
            placeholder="Telefono"
            value={values.telefono}
            style={styles.input}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}
            onChangeText={handleChange('telefono')}
               onBlur={() => setFieldTouched('telefono')} />
            </View>
            <View style={{height:12, alignItems:'center'}}>
              {touched.telefono && errors.telefono &&              
              <Text style={{ fontSize: 10, color: 'red'}}>{errors.telefono}</Text>
            }</View>
            {/*------Ocupacion------------*/}
            <View >
            <TextInput
            placeholder="Ocupación"
            value={values.ocupacion}
            style={styles.input}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}
            onChangeText={handleChange('ocupacion')}
             onBlur={() => setFieldTouched('ocupacion')} 
             />
            </View>
            <View style={{height:12, alignItems:'center'}}>
              {touched.ocupacion && errors.ocupacion &&              
              <Text style={{ fontSize: 10, color: 'red'}}>{errors.ocupacion}</Text>
            }</View>
            {/*--------Fecha ocupacion----------*/}
            <View style={{flexDirection:'row',  marginLeft:12, alignItems:'center'}}>
            <Text style={{fontSize:17, fontFamily:'roboto-light', color:'#000'}}>Celebración ocupación</Text>
            <TextInputMask
               style={{width: '38%',height: 40,backgroundColor: 'white',justifyContent: 'center', marginLeft:10, fontSize:17 }}
                type={'datetime'}
                placeholder='DD-MM'
                options={{
                    format: 'DD-MM'
                  }}
                value={values.fecha_ocupacion} 
                onChangeText={text => { setFieldValue('fecha_ocupacion', text)}}/>            
            </View>            
            <View style={{borderTopColor: '#CCCCCC', borderTopWidth: 1.2, marginLeft:10, marginRight:10}}/>
            <View >
            <TextInput
            placeholder="Documento"
            keyboardType='numeric'
            numeric 
            maxLength={8} 
            value={values.documento}
            style={styles.input}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}
            onChangeText={text => {setFieldValue('documento', text)}}
             onBlur={() => setFieldTouched('documento')}   />
            </View>
            <View style={{height:12, alignItems:'center'}}>
              {touched.documento && errors.documento &&              
              <Text style={{ fontSize: 10, color: 'red'}}>{errors.documento}</Text>
            }</View>
            {/*--------Fecha nacimiento----------*/}
            <View style={{flexDirection:'row',  marginLeft:12, alignItems:'center'}}>
            <Text style={{fontSize:17, fontFamily:'roboto-light', color:'#000'}}>Fecha de nacimiento</Text>
            <TextInputMask
               style={{width: '38%',height: 40,backgroundColor: 'white',justifyContent: 'center', marginLeft:10, fontSize:17 }}
                type={'datetime'}
                placeholder='DD-MM-YYYY'
                options={{
                    format: 'DD-MM-YYYY'
                  }}
                value={values.fecha_nacimiento} 
                onChangeText={text => { setFieldValue('fecha_nacimiento', text)}}
                onBlur={() => setFieldTouched('fecha_nacimiento')}  />            
            </View>            
            <View style={{borderTopColor: '#CCCCCC', borderTopWidth: 1.2, marginLeft:10, marginRight:10}}/>
            <View style={{height:12, alignItems:'center'}}>
              {touched.fecha_nacimiento && errors.fecha_nacimiento &&              
              <Text style={{ fontSize: 10, color: 'red'}}>{errors.fecha_nacimiento}</Text>
            }</View>
            {/*--------Intereses----------*/}
            <View style={{marginLeft:12}}>
              <Text style={{fontSize:17, fontFamily:'roboto-light',color:'#AAAAAA'}}>Intereses</Text>
              <LabelSelect
                title="INTERESES"
                onConfirm={selectConfirm}>

                {items.filter(item => item.isSelected).map((item, index) =>
            <LabelSelect.Label
              key={'label-' + index}
              data={item}
              onCancel={() => {deleteItem(item);}}>
                  {item.name}
            </LabelSelect.Label>)}

            {items.filter(item => !item.isSelected).map((item, index) =>
            <LabelSelect.ModalItem
              key={'modal-item-' + index}
              data={item}
            >{item.name}</LabelSelect.ModalItem>
          )}
        </LabelSelect>
            </View>
            <View style={{borderTopColor: '#EAEAEA', borderTopWidth: 1, marginLeft:10, marginRight:10, paddingBottom:10}}/>
            <View >
            <TextInput
            placeholder="Contraseña"
            style={styles.input}
            value={values.contraseña}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}
            onChangeText={handleChange('contraseña')}
            onBlur={() => setFieldTouched('contraseña')}    />
            </View>
            <View style={{height:12, alignItems:'center'}}>
              {touched.contraseña && errors.contraseña &&              
              <Text style={{ fontSize: 10, color: 'red'}}>{errors.contraseña}</Text>
            }</View>
            <View >
            <TextInput
            placeholder="Confirme contraseña"
            value={values.confirma_contraseña}
            style={styles.input}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}    
            onChangeText={handleChange('confirma_contraseña')}
            onBlur={() => setFieldTouched('confirma_contraseña')}   />
            </View>
            <View style={{height:12, alignItems:'center'}}>
              {touched.confirma_contraseña && errors.confirma_contraseña &&              
              <Text style={{ fontSize: 10, color: 'red'}}>{errors.confirma_contraseña}</Text>
            }</View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={handleSubmit}  >
                 <LinearGradient
                    colors={['#323232', '#4a4949']}
                    style={styles.signIn}>
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>REGISTRARME</Text>
                </LinearGradient> 
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
        </ImageBackground>

      </View>
      )}
      </Formik>
    );
};



export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:40,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    actionerror: {
        flexDirection: 'row',
        marginBottom:25,
        borderBottomWidth: 1,
        borderBottomColor: '#ff0000',
        paddingBottom: 1
    },
    datepicker: {
        flexDirection: 'row',
        marginBottom:25,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: -5,
        marginTop:-16
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        marginBottom:-10
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    signIn2: {
      width: '100%',
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
  },
    textSign: {
        fontSize: 15,
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    inputIcon:{
        position: "absolute",
        top:10,
        left:12
      },
      input:{
        marginLeft:12,
        fontSize: 16,
        height: 44,
        width: WIDTH - 55,
        borderBottomColor:'#c1c1c1',
        borderBottomWidth:1,
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
       }
  });