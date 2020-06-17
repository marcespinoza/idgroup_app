import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import {Card, CardItem,Header, Body} from 'native-base';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CuentaScreen = ({navigation}) => {

  
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../../../Images/card_background.jpg')}  />
         <Card style={{marginLeft: 5,
                               marginRight: 5,
                               marginTop: 5,
                               paddingBottom: 10,
                               borderRadius: 10 }}>
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
            <View style={{borderTopColor: '#20b1e8',
                borderTopWidth: 1, marginLeft:20, marginRight:20}}>
            <Text style={styles.textstyleheader}>
              VARIACION MENSUAL 
            </Text>
            <Text style={styles.textstyle}>
              % 25
            </Text>
            </View>
            </Card>
            <Card style={{borderRadius:17, marginLeft:5, marginRight:5, flexDirection:'row'}}>
              <Image style={{alignSelf:'center', margin:10}}source={require('../../../Images/check.png')} />
              <Text style={{alignSelf:'center'}}>CUOTAS ABONADAS</Text>
            </Card>
            <Card style={{borderRadius:17, marginLeft:5, marginRight:5, flexDirection:'row'}}>
              <Image style={{alignSelf:'center', margin:10}}source={require('../../../Images/close.png')} />
              <Text style={{alignSelf:'center'}}>CUOTAS ADEUDADAS</Text>
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
}
});