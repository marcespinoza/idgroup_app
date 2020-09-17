import React, {useState,useEffect, useRef} from 'react';
import { View, Text, StyleSheet, StatusBar, AsyncStorage, Animated, Easing, ScrollView, TextInput, TouchableOpacity, Dimensions, Switch} from 'react-native';
import { Formik } from 'formik'
import axios from 'axios';
import * as yup from 'yup';
import Loader from '../../utils/Loader.js'
import * as Animatable from 'react-native-animatable';
import { TextInputMask } from 'react-native-masked-text';
import LabelSelect from '../../utils/LabelSelect';
import moment from "moment";


const {width: WIDTH} = Dimensions.get('window');

const PerfilScreen = ({navigation}) => {

  const [data, setData] = React.useState({
    nombre: '',
    apellido: '',
    documento: '',
    direccion: '',
    telefono: '',
    fecha_nacimiento: '',
    interes:'',
    ocupacion: '',
    correo:'',
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
    mensajeloading:'',
    modal_:false,
    progress:new Animated.Value(0),
});


  const retrieveData = async () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
       stores.map((result, i, store) => {
        setData({
          ...data,
          apellido: stores[0][1],
          contraseña: stores[1][1],    
          correo: stores[2][1],
          direccion:stores[3][1],
          documento:stores[4][1],
          fecha_nacimiento: stores[5][1],
          fecha_ocupacion: stores[6][1],
          idcliente: stores[7][1],
          interes: stores[8][1],
          nombre: stores[10][1],
          ocupacion:stores[11][1],  
          telefono: stores[12][1],
      });
       });
       console.log(stores)
      });
    });
  }

  // const toggle = React.useCallback(() => {
  //   setFormState(formState === false ? true: false);
  // }, [formState, setFormState]);


  const [nacimiento, setNacimiento] = useState('');
  const [items, setInteres] = useState([]);
  const [formState, setFormState] = useState(false);
  const[formValues, setFormValues] = useState(['']['']);

  useEffect(() => {
     setInteres(opciones);    
     retrieveData();    
  }, []);
      
  const toggleSwitch = () => setFormState(previousState => !previousState);

    const selectConfirm=(list)=> {
       let items2 = [...items];
         for (let item of list) {
           let index = items2.findIndex(ele => ele === item);
             if (~index) items2[index].isSelected = true;
             else continue;
         }
          setInteres(items2)
       }

         const deleteItem=(item)=> {
            let items2 =[...items];
            let index = items2.findIndex(a => a === item);
            items2[index].isSelected = false;
            setInteres(items2);
          }

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

  async function editarcliente() {
    const URL = 'https://admidgroup.com/api_rest/index.php/api/editarcliente';
    setData({
        ...data,
        loading:true,
        mensajeloading:'Guardando cambios'
    });
    axios.post(URL, {
    idcliente: data.idcliente,  
    nombre: formRef.current.values.nombre,
    apellido: formRef.current.values.apellido,
    correo: formRef.current.values.correo,
    direccion:formRef.current.values.direccion,
    telefono:formRef.current.values.telefono,
    ocupacion: formRef.current.values.ocupacion,
    fecha_ocupacion: moment(formRef.current.values.fecha_ocupacion, 'DD-MM-YYYY').format('YYYY-MM-DD'),
    documento: formRef.current.values.documento,
    fecha_nacimiento: moment(formRef.current.values.fecha_nacimiento, 'DD-MM-YYYY').format('YYYY-MM-DD'),
    interes: 'data.interes',
    clave: formRef.current.values.contraseña,
  })
  .then(function(response) {
    // handle success
    console.log(response);
    let resp = response.data;
    setData({
        ...data,
        loading:false,
        modal_:true,
    });
    Animated.timing(data.progress, {
      toValue: 1,
      duration: 2500,
      easing: Easing.linear,
    }).start();
  }.bind(this))
  .catch(function(error) {
    setData({
        ...data,
        loading:false
    });
    console.log(error);
   }.bind(this));
}
  
    return (
      <Formik
      initialValues={{ 
        nombre: data.nombre,
        apellido: data.apellido,
        correo:data.correo,
        direccion:data.direccion,
        telefono:data.telefono,
        ocupacion:data.ocupacion,
        documento:data.documento,
        fecha_nacimiento:data.fecha_nacimiento,
        fecha_ocupacion:data.fecha_ocupacion,
        interes:'',
        contraseña:data.contraseña,
        confirma_contraseña:data.contraseña
      }}
      enableReinitialize
      innerRef={formRef}
      onSubmit={editarcliente}
      validationSchema={yup.object().shape({
          nombre: yup
          .string()
          .required('Este campo es obligatorio'),
          apellido: yup
          .string() 
          .required('Este campo es obligatorio'),
          correo: yup
          .string() 
          .required('Este campo es obligatorio'),
          direccion: yup
         .string() 
         .required('Este campo es obligatorio'),
          telefono: yup
         .string() 
         .required('Este campo es obligatorio'),
          ocupacion: yup
          .string() 
          .required('Este campo es obligatorio'),
          documento: yup
          .string()
          .required('Este campo es obligatorio'),
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
      {({ values, handleChange, errors, setFieldTouched, touched, setFieldValue, handleSubmit }) => (
        <View style={styles.container}>
          
            <StatusBar backgroundColor='#20b1e8' barStyle="light-content"/>
            <Loader  loading={data.loading} mensaje={data.mensajeloading }/>
            <View style={styles.header}>
            <Text style={{fontFamily:'roboto-thin', fontSize:20}}>Editar mis datos</Text>
            <Switch
             onValueChange = {toggleSwitch}
             value={formState}/>              
            </View>            
              <ScrollView >    
              <View >     
               <View>
                 <TextInput
                   value={values.nombre}
                   style={formState? styles.input : styles.inputdisabled}
                   placeholder="Nombre/s"
                   editable={formState}
                   selectTextOnFocus={formState}
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
                style={formState? styles.input : styles.inputdisabled}
                editable={formState}
                selectTextOnFocus={formState}
                inputContainerStyle={{ borderColor: '#EAEAEA' }}
                onChangeText={handleChange('apellido')}
                 onBlur={() => setFieldTouched('apellido')} 
               />
              </View>
              <View style={{height:12, alignItems:'center'}}>
                {touched.apellido && errors.apellido &&              
                <Text style={{ fontSize: 10, color: 'red'}}>{errors.apellido}</Text>
              }</View>
              <View >
              <TextInput
              placeholder="Correo"
              value={values.correo}
              style={formState? styles.input : styles.inputdisabled}
              editable={formState}
              inputContainerStyle={{ borderColor: '#EAEAEA' }}
              onChangeText={handleChange('correo')}
                 onBlur={() => setFieldTouched('correo')} />
              </View>
              <View style={{height:12, alignItems:'center'}}>
                {touched.correo && errors.correo &&              
                <Text style={{ fontSize: 10, color: 'red'}}>{errors.correo}</Text>
              }</View>
              <View >
            <TextInput
            placeholder="Dirección"
            value={values.direccion}
            style={formState? styles.input : styles.inputdisabled}
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
            style={formState? styles.input : styles.inputdisabled}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}
            onChangeText={handleChange('telefono')}
               onBlur={() => setFieldTouched('telefono')} />
            </View>
            <View style={{height:12, alignItems:'center'}}>
              {touched.telefono && errors.telefono &&              
              <Text style={{ fontSize: 10, color: 'red'}}>{errors.telefono}</Text>
            }</View>
              <View >
              <TextInput
              placeholder="Ocupación"
              value={values.ocupacion}
              style={formState? styles.input : styles.inputdisabled}
              editable={formState}
              inputContainerStyle={{ borderColor: '#EAEAEA' }}
              onChangeText={handleChange('ocupacion')}
               onBlur={() => setFieldTouched('ocupacion')} 
               />
              </View>
              <View style={{height:12, alignItems:'center'}}>
                {touched.ocupacion && errors.ocupacion &&              
                <Text style={{ fontSize: 10, color: 'red'}}>{errors.ocupacion}</Text>
              }</View>
              <View style={{flexDirection:'row',   alignItems:'center'}}>
              <Text style={{fontSize:17, fontFamily:'roboto-light', color:'#AAAAAA'}}>Celebración ocupación</Text>
              <TextInputMask
                 style={{width: '38%',height: 40,backgroundColor: 'white',justifyContent: 'center', marginLeft:10, fontSize:17 }}
                  type={'datetime'}
                  placeholder='DD-MM'
                  style={formState? styles.dateinput : styles.dateinputdisabled}
                  editable={formState}
                  options={{
                      format: 'DD-MM'
                    }}
                  value={values.fecha_ocupacion} 
                  onChangeText={text => { setFieldValue('fecha_ocupacion', text)}}/>            
              </View>            
              <View style={{borderTopColor: '#CCCCCC', borderTopWidth: 1,  marginRight:10}}/>
              <View style={{height:12, alignItems:'center'}}>
                {touched.fecha_nacimiento && errors.fecha_nacimiento &&              
                <Text style={{ fontSize: 10, color: 'red'}}>{errors.fecha_nacimiento}</Text>
              }</View>
              <View >
              <TextInput
              placeholder="Documento"
              keyboardType='numeric'
              maxLength={8} 
              value={values.documento}
              editable={formState}
              style={formState? styles.input : styles.inputdisabled}
              inputContainerStyle={{ borderColor: '#EAEAEA' }}
              onChangeText={handleChange('documento')}
               onBlur={() => setFieldTouched('documento')}   />
              </View>
              <View style={{height:12, alignItems:'center'}}>
                {touched.documento && errors.documento &&              
                <Text style={{ fontSize: 10, color: 'red'}}>{errors.documento}</Text>
              }</View>
              <View style={{flexDirection:'row',   alignItems:'center'}}>
              <Text style={{fontSize:17, fontFamily:'roboto-light', color:'#AAAAAA'}}>Fecha de nacimiento</Text>
              <TextInputMask
                 style={{width: '38%',height: 40,backgroundColor: 'white',justifyContent: 'center', marginLeft:10, fontSize:17 }}
                  type={'datetime'}
                  placeholder='DD-MM-YYYY'
                  style={formState? styles.dateinput : styles.dateinputdisabled}
                  editable={formState}
                  options={{
                      format: 'DD-MM-YYYY'
                    }}
                  value={values.fecha_nacimiento} 
                  onChangeText={text => { setFieldValue('fecha_nacimiento', text)}}/>            
              </View>            
              <View style={{borderTopColor: '#EAEAEA', borderTopWidth: 1,  marginRight:10}}/>
              <View style={{height:12, alignItems:'center'}}>
                {touched.fecha_nacimiento && errors.fecha_nacimiento &&              
                <Text style={{ fontSize: 10, color: 'red'}}>{errors.fecha_nacimiento}</Text>
              }</View>
              <View >
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
              style={formState? styles.input : styles.inputdisabled}
              value={values.contraseña}
              editable={formState}
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
              style={formState? styles.input : styles.inputdisabled}
              editable={formState}
              inputContainerStyle={{ borderColor: '#EAEAEA' }}    
              onChangeText={handleChange('confirma_contraseña')}
              onBlur={() => setFieldTouched('confirma_contraseña')}   />
              </View>
              <View style={{height:12, alignItems:'center'}}>
                {touched.confirma_contraseña && errors.confirma_contraseña &&              
                <Text style={{ fontSize: 10, color: 'red'}}>{errors.confirma_contraseña}</Text>
              }</View>
               </View>          
              <View style={{marginBottom:30}} >
                  <TouchableOpacity
                      disabled = {!formState}
                      onPress={handleSubmit } 
                      style={formState? styles.signIn:styles.signInDisabled}
                      >
                      <Text style={formState? styles.text_guardar:styles.text_guardar_disabled}>GUARDAR CAMBIOS</Text>
                  </TouchableOpacity>
               </View>                  
              </ScrollView>
        </View>
        )}
        </Formik>
    );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#FFF',
    paddingHorizontal:30
  },
  item: {
    flex:1,
   // is 50% of container width
  },
  textstyle:{
    fontFamily:'roboto-thin',
    fontSize:25,
    textAlign:'center'
  },
  textstyleheader:{
    fontFamily:'roboto-black',
    fontSize:10,
    textAlign:'center',
    color: 'rgba(0,0,0,0.47)'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
},
signIn: {
  width: '100%',
  height: 44,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 25
},
signInDisabled: {
  width: '100%',
  height: 44,
  color:'#D9D9D9',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 25
},
navBar: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius:20,
  marginLeft:5,
  marginRight:5
},
leftContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-start',
},
input:{
  fontSize: 16,
  height: 44,
  borderBottomColor:'#c1c1c1',
  borderBottomWidth:1,
},
inputdisabled:{
  fontSize: 16,
  color:'#D9D9D9',
  height: 44,
  borderBottomColor:'#c1c1c1',
  borderBottomWidth:1,
},
dateinput:{
  fontSize: 16,
  height: 45,
  marginLeft:10,
},
dateinputdisabled:{
  fontSize: 16,
  height: 45,
  marginLeft:10,
  color:'#D9D9D9',
},
header: {
  flex: 1,
  paddingTop:50,
  paddingBottom: 50,
  alignItems:'center',
  flexDirection:'row'
},
text_guardar:{
  color:'#323232', 
  fontFamily:'roboto-black',
  marginTop:20, 
  fontSize:15
},
text_guardar_disabled:{
  color:'#D9D9D9', 
  fontFamily:'roboto-black',
  marginTop:20, 
  fontSize:15
}
});