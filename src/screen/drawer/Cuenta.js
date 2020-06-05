import React from 'react';
import { Button, View, Text, StyleSheet, } from 'react-native';

const Cuenta = ({navigation}) => {

    
      return (
        <View style={styles.container}>
          <Text >Home Screen</Text>
        <Button
          title="Go to details screen"
        />
        </View>
      );
  };
  

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });

  export default Cuenta;
