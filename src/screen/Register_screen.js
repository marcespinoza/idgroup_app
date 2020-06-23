import React ,{useState}from 'react';
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

import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'
import { HelperText, TextInput } from 'react-native-paper';
import { Input } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';


const RegisterScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        lastname: '',
        password: '',
        confirm_password: '',
        check_nametextInputChange: false,
        check_lastnametextInputChange: false,
        check_idtextInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        date:'',
        NameErrorMessage:'',
        LastNameErrorMessage:'',
        IdErrorMessage:'',
        PassErrorMessage:'',
        ConfirmPassErrorMessage:'',
        showDropDown: false
    });

    const items = [
        // this is the parent or 'item'
        {
          name: 'Intereses',
          id: 0,
          // these are the children or 'sub items'
          children: [
            {
              name: 'Educación',
              id: 10,
            },
            {
              name: 'Tecnologia',
              id: 17,
            },
          ],
        },
      
      ];

    const nametextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                NameErrorMessage:''
            });
        } else {
            setData({
                ...data,
                username: val,
                NameErrorMessage:'Este campo es obligatorio'
            });
        }
    }

    const lastnametextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                lastname: val,
                LastNameErrorMessage: ''
            });
        } else {
            setData({
                ...data,
                lastname: val,
                LastNameErrorMessage: 'Este campo es obligatorio'
            });
        }
    }

    const datetextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                date: val,
            });
        } else {
            setData({
                ...data,
                date: val,
            });
        }
    }

    const idtextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                idtextInputChange: val,
                IdErrorMessage:''
            });
        } else {
            setData({
                ...data,
                idtextInputChange: val,
                IdErrorMessage:'Este campo es obligatorio'
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [nacimiento, setNacimiento] = useState('2222-22-22');


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

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#20b1e8' barStyle="light-content"/>
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
              size={22}
                />}
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
            errorMessage={data.LastNameErrorMessage} 
            onChangeText={value => lastnametextInputChange(value)} 
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
            errorMessage={data.LastNameErrorMessage} 
            onChangeText={value => lastnametextInputChange(value)} 
             />
            </View>
            <TouchableOpacity >
            <View >
            <Input
            placeholder="Interés"
             leftIcon={<MaterialCommunityIcons 
                name="wallet-travel"
              color="#05375a"
              size={22}
                />}
            errorMessage={data.LastNameErrorMessage} 
            onChangeText={value => lastnametextInputChange(value)} />
            <SectionedMultiSelect
              items={items}
              uniqueKey="id"
              subKey="children"
              selectText="Intereses"
              single="true"
              showDropDowns={false}
              readOnlyHeadings={true}
            //   onSelectedItemsChange={this.onSelectedItemsChange}
            //   selectedItems={this.state.selectedItems}
        />
            </View>
            </TouchableOpacity>
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
            onChangeText={value => idtextInputChange(value)}   />
            </View>
            <TouchableOpacity onPress={showDatePicker}>

            <View >
            
            <Input
            placeholder="Fecha de nacimiento"
            disabled="true"
            value={nacimiento}

             leftIcon={<MaterialCommunityIcons 
                name="calendar-month-outline"
              color="#05375a"
              size={22}
                />}
            errorMessage=''  />
            <DateTimePickerModal
             isVisible={isDatePickerVisible}
             mode="date"
             placeholder='fecha'
             onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              onHide={hideDatePicker}
             />
            </View>
            </TouchableOpacity>      
            <View >
            <Input
            placeholder="Contraseña"
             leftIcon={<MaterialCommunityIcons 
                name="lock-open-variant-outline"
              color="#05375a"
              size={20}
                />}
            errorMessage={data.PassErrorMessage}  />
            </View>

            <View >
            <Input
            placeholder="Confirme contraseña"
             leftIcon={<MaterialCommunityIcons 
                name="lock-open-variant-outline"
              color="#05375a"
              size={20}
                />}
            errorMessage={data.ConfirmPassErrorMessage}  />
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {}}  >
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