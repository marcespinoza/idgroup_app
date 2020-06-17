import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import {Card, CardItem,Header, Body} from 'native-base';
import cardbackground from '../../../Images/card_background.jpg'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CuentaScreen = ({navigation}) => {

  
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../../../Images/card_background.jpg')}  />
         <Card style={styles.cardContainer}>
            <View  style={styles.item}>
            <View style={{alignItem:'center'}}>
                <Text style={styles.textstyle}>Cuota 1</Text>
                </View>
            </View>
            <View  style={styles.item}>
              <View style={{alignItem:'center'}}>
                <Text style={styles.textstyle}>Cuota 1</Text>
                </View>
            </View>
               <View  style={styles.item}>
               <View style={{alignItem:'center'}}>
                <Text style={styles.textstyle}>Cuota 1</Text>
                </View>
            </View>
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
    fontFamily:'roboto-light',
    fontSize:25,
    textAlign:'center'
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