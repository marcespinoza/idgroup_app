import React ,{useState, useEffect}from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'
import { HelperText, TextInput } from 'react-native-paper';
import { Input } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { TextInputMask } from 'react-native-masked-text'
import LabelSelect from '../utils/LabelSelect';
import Loader from '../utils/Loader.js'


const RegisterScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        nombre: '',
        apellido: '',
        documento: '',
        correo:'',
        fecha_nacimiento: '',
        interes:'',
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
        loading: false
    });

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

    const nametextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                nombre: val,
                NameErrorMessage:''
            });
        } else {
            setData({
                ...data,
                nombre: val,
                NameErrorMessage:'Este campo es obligatorio'
            });
        }
    }

    const lastnametextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                apellido: val,
                LastNameErrorMessage: ''
            });
        } else {
            setData({
                ...data,
                apellido: val,
                LastNameErrorMessage: 'Este campo es obligatorio'
            });
        }
    }



    const ocupaciontextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                ocupacion: val,
            });
        } else {
            setData({
                ...data,
                ocupacion: val,
            });
        }
    }

    const idtextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                documento: val,
                IdErrorMessage:''
            });
        } else {
            setData({
                ...data,
                documento: val,
                IdErrorMessage:'Este campo es obligatorio'
            });
        }
    }

    const mailtextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                correo: val,
                IdErrorMessage:''
            });
        } else {
            setData({
                ...data,
                correo: val,
                IdErrorMessage:'Este campo es obligatorio'
            });
        }
    }

    const passwordtextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                contraseña: val,
                PassErrorMessage:''
            });
        } else {
            setData({
                ...data,
                contraseña: val,
                PassErrorMessage:'Este campo es obligatorio'
            });
        }
    }

    const confirmPasswordtextInputChange = (val) => {
        console.log(val)
        if( val.length == 0 ) {
            setData({
                ...data,
                confirma_contraseña: val,
                ConfirmPassErrorMessage:'Este campo es obligatorio'
            });
        }else if(val.length !== 0  && data.contraseña !== val){
            setData({
                ...data,
                confirma_contraseña: val,
                ConfirmPassErrorMessage:'Las contraseñas deben coincidir'
            });
        } else {
            setData({
                ...data,
                confirma_contraseña: val,
                ConfirmPassErrorMessage:'Deben coincidir'
            });
        }
    }


   const registro = async =>{
        const URL = 'http://admidgroup.com/api_rest/index.php/api/cliente';
        setData({
            ...data,
            loading:true
        });
        axios.post(URL, {
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        ocupacion: data.ocupacion,
        documento: data.documento,
        fecha_nacimiento: data.nacimiento,
        interes: data.interes,
        contraseña: data.contraseña,
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers":"X-Requested-With"
        },
      })
      .then(function(response) {
        // handle success
        let resp = response.data;
        setData({
            ...data,
            loading:false
        });
      }.bind(this))
      .catch(function(error) {
        setData({
            ...data,
            loading:false
        });
       }.bind(this));
    
    }

    const [nacimiento, setNacimiento] = useState('');
    const [items, setInteres] = useState([]);
    useEffect(() => {
        // Should not ever set state during rendering, so do this in useEffect instead.
        setInteres(opciones);
      }, []);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      setNacimiento(moment(date, 'MMMM Do YYYY, h:mm:ss a').format('DD-MM-YYYY'))
      hideDatePicker();
    };

      const  onSelectedItemsChange = (selectedItems) => {
            console.log(selectedItems, selectedItems.length)
            setInteres(selectedItems.length)
          }

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

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#20b1e8' barStyle="light-content"/>
          <Loader  loading={data.loading} />
        <View style={styles.header}>
            <Text style={styles.text_header}>Bienvenido!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig" delay={800}
            style={styles.footer}   >
            <ScrollView>                
            <View>
            <Input
            placeholder="Nombre/s"
             leftIcon={<MaterialCommunityIcons 
             name="account-circle-outline"
             color="#05375a"
             size={22}/>}
             inputContainerStyle={{ borderColor: '#EAEAEA' }}
            errorMessage={data.NameErrorMessage}
            onChangeText={value => nametextInputChange(value)}  />
        </View>
            <View >
            <Input
            placeholder="Apellido/s"
             leftIcon={<MaterialCommunityIcons 
                name="account-circle-outline"
              color="#05375a"
              size={22}
                />}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}
            errorMessage={data.LastNameErrorMessage} 
            onChangeText={value => lastnametextInputChange(value)} 
             />
            </View>
            <View >
            <Input
            placeholder="Correo"
             leftIcon={<MaterialCommunityIcons 
                name="email-outline"
              color="#05375a"
              size={22}
                />}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}
            errorMessage={data.LastNameErrorMessage} 
            onChangeText={value => mailtextInputChange(value)} 
             />
            </View>
            <View >
            <Input
            placeholder="Ocupación"
             leftIcon={<MaterialCommunityIcons 
                name="wallet-travel"
              color="#05375a"
              size={22}
                />}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}
            errorMessage={data.LastNameErrorMessage} 
            onChangeText={value => ocupaciontextInputChange(value)} 
             />
            </View>
            <View >
            <Input
            placeholder="Documento"
            keyboardType='numeric'
             leftIcon={<MaterialCommunityIcons 
                name="card-bulleted-outline"
              color="#05375a"
              size={22}
                />}
            errorMessage=''
            inputContainerStyle={{ borderColor: '#EAEAEA' }}
            onChangeText={value => idtextInputChange(value)}   />
            </View>
            <View style={{flexDirection:'row',  marginLeft:12, alignItems:'center'}}>
            {/* <Icon name="lock" size={25} color="#000000" style={{marginTop:4}}/> */}
            <Text style={{fontSize:17, fontFamily:'roboto-light', color:'#AAAAAA'}}>Fecha de nacimiento</Text>
            <TextInputMask
               style={{width: '35%',height: 40,backgroundColor: 'white',justifyContent: 'center', marginLeft:10, fontSize:17 }}
                type={'datetime'}
                placeholder='DD/MM/YYYY'
                options={{
                    format: 'DD/MM/YYYY'
                  }}
                value={nacimiento}
                onChangeText={text => { setNacimiento(text)}}  />

            </View>
            <View style={{borderTopColor: '#EAEAEA', borderTopWidth: 1, marginLeft:10, marginRight:10, paddingBottom:15}}/>
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
            <Input
            placeholder="Contraseña"
             leftIcon={<MaterialCommunityIcons 
                name="lock-open-variant-outline"
              color="#05375a"
              size={20}
                />}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}
            errorMessage={data.PassErrorMessage} 
            onChangeText={val => { passwordtextInputChange(val)}}   />
            </View>

            <View >
            <Input
            placeholder="Confirme contraseña"
             leftIcon={<MaterialCommunityIcons 
                name="lock-open-variant-outline"
              color="#05375a"
              size={20}
                />}
            inputContainerStyle={{ borderColor: '#EAEAEA' }}    
            errorMessage={data.ConfirmPassErrorMessage} 
            onChangeText={value => confirmPasswordtextInputChange(value)}  />
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={registro}  >
                 <LinearGradient
                    colors={['#323232', '#4a4949']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>REGISTRARME</Text>
                </LinearGradient> 
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};



export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#20b1e8'
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
    }
  });