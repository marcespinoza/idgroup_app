import React,{useEffect, useState} from 'react';
import { View, StyleSheet,AsyncStorage } from 'react-native';
import {
    Title,
    Drawer
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Linking from 'expo-linking';
import{ AuthContext } from './../utils/context';


const DrawerContent = props => {

  const [usuario, setUsuario] = useState('usuario');
  const { signOut} = React.useContext(AuthContext);
  useEffect(() => {
    retrieveData();
  });

  _openFacebook = () => {
    Linking.openURL('https://www.facebook.com/IDGroupdesarrollosinmobiliarios/');
    this.props.onPress && this.props.onPress();
  };

  _openInstagram = () => {
    Linking.openURL('https://www.instagram.com/inversionesidgroup/');
    this.props.onPress && this.props.onPress();
  };

  _openWeb = () => {
    Linking.openURL('https://www.inversionesidgroup.com/');
    this.props.onPress && this.props.onPress();
  };

const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("nombre");
      if (value !== null) {
        setUsuario(value);
      }
     } catch (error) {
       // Error retrieving data
     }
  }

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            {/* <Avatar.Image 
                                source={require('../../Images/logo_login.jpg')}
                                size={50}
                            /> */}
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>{usuario}</Title>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Estado de cuenta"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="facebook" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Facebook"
                            onPress={() => {_openFacebook()}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="instagram" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Instagram"
                            onPress={() => {_openInstagram()}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="web" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Web"
                            onPress={() => {_openWeb()}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="face-profile" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Mi perfil"
                            onPress={() => {props.navigation.navigate('Perfil')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Cerrar sesión"
                    onPress={() =>  {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });