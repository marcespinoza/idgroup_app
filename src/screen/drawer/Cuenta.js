import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import {Card, CardItem,Header, Body} from 'native-base';
import axios from 'axios';


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

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#E8E8E8",
      }}
    />
  );
}

const Country = ({ name }) => (
  <View style={{flexDirection:'row', flex:1,justifyContent: 'space-between',
  alignItems: 'center',}}>
    <Text style={{ flex:1, fontFamily:'roboto-thin'}}>{name}</Text>
    <Text style={{  flex:1, fontFamily:'roboto-thin'}}>16/07/2020</Text>
    <View style={{alignItems:'flex-end'}}>
    <Text style={{ flex:1, fontFamily:'roboto-light' }}>$9.000</Text>
    </View>
  </View>
);

const cuotas = ["Enero", "Febrero", "Marzo", "Abril"];

useEffect(() => {
  // Actualiza el título del documento usando la API del navegador
  getCotizacion()
});
  
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../../../Images/fondoregister.jpg')}  />
        <Card style={{marginLeft: 5,
                               marginRight: 5,
                               marginTop: 5 }}>
           <View style={styles.cardContainer}> 
            <View  style={styles.item}>
            <View style={{alignItem:'center'}}>
                <Text style={styles.textstyleheader}>PISO</Text>
                <Text style={styles.textstyle}>4</Text>
                </View>
            </View>
            <View  style={styles.item}>
              <View style={{alignItem:'center'}}>
                <Text style={styles.textstyleheader}>UNIDAD</Text>
                <Text style={styles.textstyle}>403</Text>
                </View>
            </View>
               <View  style={styles.item}>
               <View style={{alignItem:'center'}}>
                <Text style={styles.textstyleheader}>DORMITORIOS</Text>
                <Text style={styles.textstyle}>1</Text>
                </View>
            </View>
            </View>
        </Card>
         <Card style={{marginLeft: 5,
                               marginRight: 5,
                               paddingBottom: 10}}>
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
            <Text style={{color:'#AEAEAE'}}>Cotización sujeta a modificaciones</Text>
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
            <View style={{ flex: 1 }}>
              <Card style={{marginLeft: 5,
                               marginRight: 5,
                               padding: 5,
                               borderRadius:4}}>
                <FlatList
                    data={cuotas}
                    initialNumToRender={2}
                    renderItem={({item}) => <Country name={item} />}
                    ItemSeparatorComponent = { FlatListItemSeparator }
                />
                </Card>
            </View>
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