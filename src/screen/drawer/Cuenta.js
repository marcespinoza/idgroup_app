import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import {Card, CardItem,Header, Body} from 'native-base';
import axios from 'axios';


const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CuentaScreen = ({navigation}) => {

  const [oficial, setOficial] = useState("");
  const [blue, setBlue] = useState("");

  async function getCotizacion() {
    const URL = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
    axios.get(URL)
  .then(function(response) {
    // handle success
    let resp = response.data;
    setOficial(resp[0].casa.venta)
    setBlue(resp[1].casa.venta)
  }.bind(this))
  .catch(function(error) {
    console.log(JSON.stringify(error));
   }.bind(this));

}

useEffect(() => {
  // Actualiza el título del documento usando la API del navegador
  getCotizacion()
});
  
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../../../Images/card_background.jpg')}  />
         <Card style={{marginLeft: 5,
                               marginRight: 5,
                               marginTop: 5,
                               paddingBottom: 10,
                               borderBottomRightRadius: 12,
                               borderBottomLeftRadius:12 }}>
           <View style={styles.cardContainer}> 
            <View  style={styles.item}>
            <View style={{alignItem:'center'}}>
                <Text style={styles.textstyleheader}>MES</Text>
                <Text style={styles.textstyle}>Junio</Text>
                </View>
            </View>
            <View  style={styles.item}>
              <View style={{alignItem:'center'}}>
                <Text style={styles.textstyleheader}>CUOTA</Text>
                <Text style={styles.textstyle}>1</Text>
                </View>
            </View>
               <View  style={styles.item}>
               <View style={{alignItem:'center'}}>
                <Text style={styles.textstyleheader}>MONTO</Text>
                <Text style={styles.textstyle}>$9.000</Text>
                </View>
            </View>
            </View>
            <View style={{borderTopColor: '#20b1e8', borderTopWidth: 1, marginLeft:20, marginRight:20}}>
            <Text style={styles.textstyleheader}> VARIACION MENSUAL </Text>
            <Text style={styles.textstyle}> % 25 </Text>
            <View style={{flexDirection:'row', paddingTop:13}}><Text style={styles.cotizacion}>Dolar oficial: US$ {oficial}</Text><Text style={styles.cotizacion}>Dolar blue: US$ {blue}</Text></View>
            </View>
            </Card>
            <Card style={styles.navBar}>
            <View style={styles.leftContainer}>
            <Image style={{alignSelf:'center', margin:10}}source={require('../../../Images/check.png')} />
            <Text style={{ alignSelf:'center'}}>CUOTAS ABONADAS</Text>
             </View>
              <Text style={{alignSelf:'center', margin:10}}>58</Text>
            </Card>
            <Card style={styles.navBar}>
            <View style={styles.leftContainer}>
            <Image style={{alignSelf:'center', margin:10}}source={require('../../../Images/close.png')} />
            <Text style={{ alignSelf:'center'}}>CUOTAS RESTANTES</Text>
             </View>
              <Text style={{alignSelf:'center', margin:10}}>58</Text>
            </Card>
      </View>
    );
};

export default CuentaScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  cardContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
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
rightContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
},
rightIcon: {
  height: 10,
  width: 10,
  resizeMode: 'contain',
  backgroundColor: 'white',
},
cotizacion:{
  flex:1,
  fontFamily:'roboto-thin'
}
});