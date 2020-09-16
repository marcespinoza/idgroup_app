import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import CuentaScreen from './drawer/Cuentastack.js';
import RegisterScreen from '../screen/Register_screen.js'
import DrawerContent from '../screen/DrawerContent.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import PerfilScreen from './drawer/Perfilstack.js'
import { AuthContext } from './../utils/context';

const Drawer = createDrawerNavigator();

  const DrawerScreen = ({navigation}) => {

  const [dispatch] = React.useReducer(loginReducer);

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'LOGOUT': 
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    }
  };

  const authContext = React.useMemo(() => ({
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('login');
       await AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
      } catch(e) {
        console.log(e);
      }
      navigation.navigate('LoginScreen')
    }
  }), []);

  return(
  <AuthContext.Provider value={authContext}>
    <NavigationContainer>
  <Drawer.Navigator  drawerContent={(props)=> <DrawerContent {...props}/>}
    initialRouteName="Home"    >
    <Drawer.Screen name="Home" component={CuentaScreen}/>
    <Drawer.Screen name="Perfil" component={PerfilScreen}  />
  </Drawer.Navigator>
  </NavigationContainer>
  </AuthContext.Provider>
  )
};  



export default DrawerScreen;

const  styles = StyleSheet.create({
  container: {
    flex:1
  }
})
