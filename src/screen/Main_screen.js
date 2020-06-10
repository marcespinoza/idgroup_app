import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import Cuenta from '../screen/drawer/Cuenta.js';
import DrawerContent from '../screen/DrawerContent.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';


const Drawer = createDrawerNavigator();
function DrawerScreen  () {
  return(
  <Drawer.Navigator
   drawerContent={(props)=> <DrawerContent {...props}/>}
    initialRouteName="Profile">
    <Drawer.Screen name="Home" component={Cuenta}/>
    <Drawer.Screen name="Profile" component={NotificationsScreen} />
  </Drawer.Navigator>
  )
};  

// const CustomDrawerComponent = (navigation) => (
  
//   <SafeAreaView>
//     <View style={{height:150, backgroundColor:'#323232'}}>
//     </View>
//   </SafeAreaView>
// )


function NotificationsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex:1}}>
        <TouchableOpacity
           style={{alignItems: "flex-start", margin:16, }}
           onPress={navigation.openDrawer}>
            <Icon name="bars" size={16}/>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

export default () => {
return (
    <NavigationContainer>
      <DrawerScreen />
    </NavigationContainer>
);
}

const  styles = StyleSheet.create({
  container: {
    flex:1
  }
})