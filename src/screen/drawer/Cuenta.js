import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image, FlatList, RefreshControl, ScrollView, AsyncStorage} from 'react-native';
import Loader from './../../utils/Loader'
import {Card, CardItem,Header, Body} from 'native-base';
import axios from 'axios';


const CuentaScreen = ({navigation}) => {

  const [oficial, setOficial] = useState("");
  const [blue, setBlue] = useState("");
  const [cuotas, setCuotas] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [unidad, setUnidad]= useState({ubicacion:'-', unidad:'-', dormitorios:'-', m2_propios:'-', m2_comunes:'-',total_m2:'-'});
  const [proxCuota, setProxCuota] = useState([])
  const [valorDolar, setValorDolar] = useState('-')
  const [nuevaCuota, setNuevaCuota] = useState('')
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true); 
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [data, setData] = React.useState({
    idcliente: '',
    showDropDown: false,
    loading: false,
    modal_:false,
  });

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

const retrieveData = async () => {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
     stores.map((result, i, store) => {
      setData({
        ...data,
        idcliente: stores[5][1],
    });
     });
    });
  });
}

let unidadfuncional = "http://admidgroup.com/api_rest/index.php/api/unidadporcliente";
let cuota = "http://admidgroup.com/api_rest/index.php/api/cuotasporcliente";
let prox_cuota = "http://admidgroup.com/api_rest/index.php/api/proximacuota";

var config = {
  idcliente: '79',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Headers":"X-Requested-With"
     },}

const requestOne = axios.post(unidadfuncional, config);
const requestTwo = axios.post(cuota, config);
const requestThree = axios.post(prox_cuota, config);
const [loading,setLoadingState] = useState(false);

const getCuotas = async(id_cli) =>{

setLoadingState(true);

setUnidad({ubicacion:'-', unidad:'-', dormitorios:'-', m2_propios:'-', m2_comunes:'-',total_m2:'-'});
setCuotas([]);
axios.all([requestOne, requestTwo, requestThree])
.then(
axios.spread((...responses) => {
  setUnidad(responses[0].data.unidad[0])
  setCuotas(responses[1].data.cuotas)    
  setProxCuota(responses[2].data.estado[0])
  // setVariacion(responses[2].data.variaciones[0].valor);
  // setMoneda(responses[1].data.cuotas[0].moneda)
  conversion()
  setLoadingState(false);
  
})
)
.catch(errors => {
  setLoadingState(false);

  console.error("ERRORES "+errors);
});
}  

const conversion = ()=>{
  console.log("CONV "+proxCuota.moneda)

  if(proxCuota.moneda==0){
    var conv = (proxCuota.variacion * proxCuota.valor_cuota)/100
    console.log("CONV "+conv)
    conv = conv + Number.parseInt( proxCuota.valor_cuota, 10)    
    setNuevaCuota(conv)
  }else{
    setNuevaCuota(proxCuota.valor_cuota)
  }
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

const Cuota = ({ name }) => (
  <View style={{flexDirection:'row', flex:1,justifyContent: 'space-between',
  alignItems: 'center',}}>
    <Text style={{ flex:1, fontFamily:'roboto-thin'}}>{name.numero}</Text>
   <Text style={{  flex:1, fontFamily:'roboto-thin'}}>{name.fecha}</Text>
    <View style={{alignItems:'flex-end'}}>
<Text style={{ flex:1, fontFamily:'roboto-light' }}>{name.monto}</Text>
    </View>
  </View>
);

const cuot = ["Enero", "Febrero", "Marzo", "Abril"];

useEffect(() => {
  // Actualiza el título del documento usando la API del navegador
  getCotizacion(),
  retrieveData(),
  getCuotas()
},[]);
  
    return (
      <View style={styles.container}>
         <Loader  loading={loading} mensaje={'Iniciando sesión..'}/>
        <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Image style={styles.backgroundImage} source={require('../../../Images/fondoregister.jpg')}  />
        <Card style={{marginLeft: 5, marginRight: 5, marginTop: 10 }}>
           <View style={styles.cardContainer}> 
            <View  style={styles.item}>
            <View style={{alignItem:'center'}}>
                <Text style={styles.textstyleheader}>UBICACION</Text>
        <Text style={styles.textstyle}>{unidad.ubicacion}</Text>
                </View>
            </View>
            <View  style={styles.item}>
              <View style={{alignItem:'center'}}>
                <Text style={styles.textstyleheader}>UNIDAD</Text>
        <Text style={styles.textstyle}>{unidad.unidad}</Text>
                </View>
            </View>
               <View  style={styles.item}>
               <View style={{alignItem:'center'}}>
                <Text style={styles.textstyleheader}>DORMITORIOS</Text>
        <Text style={styles.textstyle}>{unidad.dormitorios}</Text>
                </View>
            </View>
            </View>
        </Card>
         <Card style={{marginLeft: 5,marginRight: 5, paddingBottom: 10}}>
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
              <Text style={styles.textstyle} >{proxCuota.prox_cuota}</Text>
                </View>
            </View>
               <View  style={styles.item}>
               <View style={{alignItem:'center'}}>
               <Text style={styles.textstyleheader}>MONTO</Text>
               <View>
                <Text style={styles.textstyle}>{proxCuota.moneda==1 ? '$$': '$'}</Text>
               <Text style={styles.textstyle}>{nuevaCuota}</Text>
               </View>
               </View>
            </View>
            </View>
            <View style={{borderTopColor: '#20b1e8', borderTopWidth: 1, marginLeft:20, marginRight:20}}>
            <View style={styles.cardContainer}> 
            <View  style={styles.item}>
            <View style={{alignItem:'center'}}>
            <Text style={styles.textstyleheader}> VARIACION MENSUAL </Text>
            <Text style={styles.textstyle}> % {proxCuota.variacion} </Text>
            </View>
            </View>
            <View  style={styles.item}>
             <View style={{alignItem:'center'}}>
             <Text style={styles.textstyleheader}>EQUIVALENTE</Text>
             <Text style={styles.textstyle}>$${valorDolar}</Text>
             </View>
            </View>
            </View>

            <View style={{flexDirection:'row', paddingTop:13}}><Text style={styles.cotizacion}>Dolar oficial: US$ {oficial}</Text><Text style={styles.cotizacion}>Dolar blue: US$ {blue}</Text></View>
            <Text style={{color:'#AEAEAE'}}>Cotización sujeta a modificaciones</Text>
            </View>
            </Card>
            <Card style={styles.navBar}>
            <View style={styles.leftContainer}>
            <Image style={{alignSelf:'center', margin:10}}source={require('../../../Images/check.png')} />
            <Text style={{ alignSelf:'center'}}>CUOTAS ABONADAS</Text>
             </View>
              <Text style={{alignSelf:'center', margin:10}}>{proxCuota.abonadas}</Text>
            </Card>
            <Card style={styles.navBar}>
            <View style={styles.leftContainer}>
            <Image style={{alignSelf:'center', margin:10}}source={require('../../../Images/close.png')} />
            <Text style={{ alignSelf:'center'}}>CUOTAS RESTANTES</Text>
            </View>
            <Text style={{alignSelf:'center', margin:10}}>{proxCuota.cant_cuotas - proxCuota.abonadas}</Text>
            </Card>
            <View style={{ flex: 1 }}>
              <Card style={{marginLeft: 5,
                               marginRight: 5,
                               padding: 5,
                               borderRadius:4}}>
                <FlatList
                    data={cuotas}
                    initialNumToRender={2}
                    renderItem={({item}) => <Cuota name={item} />}
                    ItemSeparatorComponent = { FlatListItemSeparator }
                />
                </Card>
            </View>
          </ScrollView>
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