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
        date:''
    });

    const nametextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const lastnametextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                lastname: val,
                check_lastnametextInputChange: true
            });
        } else {
            setData({
                ...data,
                lastname: val,
                check_lastnametextInputChange: false
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
                check_idtextInputChange: true
            });
        } else {
            setData({
                ...data,
                idtextInputChange: val,
                check_idtextInputChange: false
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

    const [date, setDate] = useState( new Date(
        Date.parse(
          moment('02/02/2000', 'DD/MM/YYYY').format(
            'ddd MMM DD YYYY HH:mm:ss ZZ',
          ),
        ),
      ),);

      const selectDate = (val) => {
        setData({
            ...data,
            date: val
        });
    }

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
            placeholder="Nombre"
             leftIcon={<FontAwesome 
              name="user-o"
              color="#05375a"
              size={20}
                />}
            errorMessage='ENTER A VALID ERROR HERE'  />
        </View>
            <View >
            <Input
            placeholder="Nombre"
             leftIcon={<FontAwesome 
              name="user-o"
              color="#05375a"
              size={20}
                />}
            errorMessage='ENTER A VALID ERROR HERE'  />
            </View>
            <View >
            <Input
            placeholder="Nombre"
             leftIcon={<FontAwesome 
              name="id-card-o"
              color="#05375a"
              size={20}
                />}
            errorMessage='ENTER A VALID ERROR HERE'  />
            </View>
            <View style={styles.datepicker}>
                <DatePicker 
                format="DD-MM-YYYY"
                placeholder="Fecha de nacimiento"
                maxDate="2010-01-01"
                placeholder="Seleccionar"
                date={data.date}
                iconSource={require('../../Images/calendar.png')}
                customStyles={{
                    dateInput: {
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        paddingTop:-20
                    },
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        width:22,
                        height:22,
                        marginLeft: 0,
                        paddingTop:-20
                      },
                }}
                onDateChange={selectDate}/>
            </View>       
            <View style={styles.action}>
            <Input
            placeholder="Contraseña"
             leftIcon={<MaterialCommunityIcons 
                name="lock-open-variant-outline"
              color="#05375a"
              size={20}
                />}
            errorMessage='ENTER A VALID ERROR HERE'  />
            </View>

            <View style={styles.action}>
            <Input
            placeholder="Confirme contraseña"
             leftIcon={{ type: 'material-community', name: 'lock-open-variant-outline' }}
            errorMessage='ENTER A VALID ERROR HERE'  />
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