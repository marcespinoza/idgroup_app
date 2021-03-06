import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image, FlatList, RefreshControl, ScrollView, AsyncStorage, BackHandler, Button} from 'react-native';
import Loader from './../../utils/Loader'
import axios from 'axios';
import RNPicker from 'rn-modal-picker'
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import moment from "moment";
import Notificacionsvg from '../../../assets/images/notificacion.svg';

const CuentaScreen = ({navigation}) => {

  const [oficial, setOficial] = useState("");
  const [blue, setBlue] = useState("");
  const [cuotas, setCuotas] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [unidad, setUnidad]= useState({ubicacion:'-', unidad:'-', dormitorios:'-', m2_propios:'-', m2_comunes:'-',total_m2:'-'});
  const [unidades, setUnidades] = useState([]);
  const [proxCuota, setProxCuota] = useState([])
  const [valorConversion, setValorConversion] = useState('-')
  const [valorInteres, setValorInteres] = useState('-')
  const [nuevaCuota, setNuevaCuota] = useState('')
  const [idUnidad, setidUnidad] = useState('')
  const [nombreUnidad, setNombreUnidad] = useState('')
  const [mesCuota, setMesCuota] = useState('-')
  const [visible, setVisible] = React.useState(false);
  const [banderaRefuerzo1, setBanderaRefuerzo1] = useState(false)
  const [banderaRefuerzo2, setBanderaRefuerzo2] = useState(false)

  const onRefresh =() =>{
    if(idUnidad!=''){
      setCuotas([])
      getCuotas()  
    }else{
      obtenerUnidades()
    }
  }

  async function cc(){
    setRefreshing(true)
    const URL = 'https://admidgroup.com/api_rest/index.php/api/cuotasporcliente';
    axios.post(URL, {
      idunidad: idUnidad,
      headers: {
       'Access-Control-Allow-Origin': '*',
       "Access-Control-Allow-Headers":"X-Requested-With"
       },     
  })
  .then(function(response) {
    // handle success
    setRefreshing(false)
    setCuotas(response.data.cuotas)
  }.bind(this))
  .catch(function(error) {
    setRefreshing(false)

    console.log(error)
   }.bind(this));    
  } 

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
        idcliente: stores[7][1],
    });
     });
    });
  });
}

async function obtenerUnidades() {
    setRefreshing(true)
     const URL = 'https://admidgroup.com/api_rest/index.php/api/unidadesporcliente';
     axios.post(URL, {
     idcliente: data.idcliente,
   })
   .then(function(response) {
     // handle success
     setRefreshing(false)
     let resp = response.data;
     setUnidades(response.data.unidad)
    
   }.bind(this))
   .catch(function(error) {
    console.log(error+"KE")

     setRefreshing(false)
    }.bind(this)); 
 }


let unidadfuncional = "https://admidgroup.com/api_rest/index.php/api/unidadporcliente";
let cuota = "https://admidgroup.com/api_rest/index.php/api/cuotasporcliente";
let prox_cuota = "https://admidgroup.com/api_rest/index.php/api/proximacuota";


 var config = {
   idunidad: idUnidad,
     headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Headers":"X-Requested-With",
      },
    }

let requestOne = axios.post(unidadfuncional, config);
let requestTwo = axios.post(cuota, config);
let requestThree = axios.post(prox_cuota, config);
const [loading,setLoadingState] = useState(false);
const [mensaje, setMensaje] = useState('Espere por favor..')

let getCuotas = async () =>{
  console.log("UNI"+idUnidad)
setRefreshing(true)
setUnidad({ubicacion:'-', unidad:'-', dormitorios:'-', m2_propios:'-', m2_comunes:'-',total_m2:'-'});
setCuotas([]);
await Promise.all([requestOne, requestTwo, requestThree])
.then( function (responses) {
  setRefreshing(false)
  setUnidad(responses[0].data.unidad[0])
  setCuotas(responses[1].data.cuotas)    
  setProxCuota(responses[2].data.estado[0])
	return Promise.all(responses.map(function (response) {
	}));
}).then(function (data) {
}).catch(function (error) {
  console.log(error)
  setRefreshing(false)
});}

const conversion = ()=>{ 
  switch(proxCuota.mes) { 
    case '1':
      setMesCuota('FEBRERO');break;
    case '2':
      setMesCuota('MARZO');break;
    case '3':
      setMesCuota('ABRIL');break;
    case '4':
      setMesCuota('MAYO');break;
    case '5':
      setMesCuota('JUNIO');break;  
    case '6':
      setMesCuota('JULIO');break;   
    case '7':
      setMesCuota('AGOSTO');break;
    case '8':
      setMesCuota('SEPTIEMBRE');break;
    case '9':
      setMesCuota('OCTUBRE');break;
    case '10':
      setMesCuota('NOVIEMBRE');break;
    case '11':
      setMesCuota('DICIEMBRE');break;
     case '12':
      setMesCuota('ENERO');break;

    default:
      setMesCuota('-');
  
    }
  var fechaActual  = moment(new Date());
  var fechaRefuerzo1 = moment(proxCuota.fecha_refuerzo1, "DD-MM-YYYY HH:mm:ss");
  var fechaRefuerzo2 = moment(proxCuota.fecha_refuerzo2, "DD-MM-YYYY HH:mm:ss");
  var diffechaRefuerzo1 = fechaActual.diff(fechaRefuerzo1, 'days', false)
  var diffechaRefuerzo2 = fechaActual.diff(fechaRefuerzo2, 'days', false)

  if(proxCuota.pago_refuerzo1===null && diffechaRefuerzo1<=31){
    console.log(diffechaRefuerzo1)
    setBanderaRefuerzo1(true)
  }

  if(proxCuota.pago_refuerzo2===null && diffechaRefuerzo2<=31){
    console.log(diffechaRefuerzo2)
    setBanderaRefuerzo2(true)
  }

   //----Si es primer cuota no aplico variacion----// 
  if(proxCuota.moneda==0 && proxCuota.prox_cuota!=1){ 
    //---------Obtengo la ultima cuota para calcular la proxima de acuerdo a la variacion  
  if(cuotas.length>0){
    cuotas.find(function(value, index) {
      if (index == cuotas.length-1) {
        Object.entries(value).map(([key,v])=>{        
          if(key==='monto'){
            var conv = ((proxCuota.variacion * v)/100).toFixed(2)
            conv = (Number(conv) +  parseFloat(v))
            setNuevaCuota(conv)           
         }
      })
      }
    });
  }
    setValorPesos('-')
  }else{
    setNuevaCuota(proxCuota.valor_cuota)
  }
  
}

const conversion2 = () => {
  //-----Si paso el dia 10 calculo interes---//
  var dia = new Date().getDate()
  console.log(blue+"blue"+nuevaCuota)
  if(dia>10){
    var interes = (nuevaCuota * 5)/100
    setValorInteres((Number(nuevaCuota)+Number(interes)).toFixed(2))
  }
  if(proxCuota.moneda==0){
    console.log(nuevaCuota+"nuevaa")
    setValorConversion(Number(nuevaCuota)*parseFloat(blue))
  }else{
    setValorConversion(Number(nuevaCuota)*parseFloat(oficial))
  }
}

BackHandler.addEventListener('hardwareBackPress', () => {
  BackHandler.exitApp()
});

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

useEffect(() => {
  if(Object.keys(proxCuota).length >0){
    conversion()
  }
},[proxCuota]);

useEffect(() => {
  if(Object.keys(proxCuota).length >0){
    conversion2()
  }
},[nuevaCuota]);

useEffect(() => {
  if(idUnidad!=''){
    getCuotas()
  }
},[idUnidad]);

const handleUnidad = (index, item) =>{
  setidUnidad(item.id)
  setNombreUnidad(item.name)
}

const Cuota = ({ name, color }) => (
  <View style={{flexDirection:'row', flex:1,justifyContent: 'space-between',
  alignItems: 'center', backgroundColor:color}}>
   <Text style={{ flex:1, fontFamily:'roboto-medium', color:'#099BBF'}}>{name.numero}</Text>
   <Text style={{ flex:1, fontFamily:'roboto-thin'}}>{name.observacion}</Text>
   <Text style={{  flex:1, fontFamily:'roboto-thin'}}>{name.fecha}</Text>
   <View style={{alignItems:'flex-end'}}>
   <Text style={{ flex:1, fontFamily:'roboto-light' }}>{name.monto}</Text>
    </View>
  </View>
);

useEffect(() => {
  retrieveData()
},[]);  

useEffect(() => {
  conversion()
},[cuotas]);  

useEffect(()=>{
  obtenerUnidades()
  getCotizacion()
},[data.idcliente])

    return (
      <View style={styles.container}>
         <Loader  loading={loading} mensaje={mensaje}/>
        <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Image style={styles.backgroundImage} source={require('../../../Images/fondoregister.jpg')}  />   
        <View style={{marginTop:5}}>
          <RNPicker
          dataSource={unidades}
          dummyDataSource={unidades}
          placeHolderLabel= "Seleccione una unidad"
          defaultValue={false}
          pickerTitle="Seleccione una unidad"
          showSearchBar={false}
          disablePicker={false}
          changeAnimation={"none"}
          searchBarPlaceHolder={"Search....."}
          showPickerTitle={true}
          selectedLabel={nombreUnidad}
          selectLabelTextStyle={styles.selectLabelTextStyle}
          placeHolderTextStyle={styles.placeHolderTextStyle}
          dropDownImageStyle={styles.dropDownImageStyle}
          pickerStyle={styles.pickerStyle}
          itemSeparatorStyle={styles.itemSeparatorStyle}
          selectedValue={(index, item) => handleUnidad(index, item)}
        />  
        </View>

        <Card style={{marginLeft: 5, marginRight: 5, marginTop: 5 }}>
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
             <Text style={styles.textstyle}>{mesCuota}</Text>
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
               <View style={{flexDirection:'row', flex:1, flexWrap:'wrap', justifyContent:'center'}}>
                <Text style={styles.textstyle}>{proxCuota.moneda==1 ? 'USD ': '$ '}</Text>
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
             <Text style={styles.textstyle}>${valorConversion}</Text>
             </View>
            </View>
            <View  style={styles.item}>
             <View style={{alignItem:'center'}}>
             <Text style={styles.textstyleheader}>INTERES</Text>
             <Text style={styles.textstyle}>${valorInteres}</Text>
             </View>
            </View>
            </View>
            <View style={{flexDirection:'row', paddingTop:13}}><Text style={styles.cotizacion}>Dolar oficial: USD {oficial}</Text><Text style={styles.cotizacion}>Dolar blue: USD {blue}</Text></View>
            <Text style={{color:'#AEAEAE'}}>Cotización sujeta a modificaciones</Text>
            </View>
            </Card>
            {banderaRefuerzo1?
            <View style={{display:'flex', flexDirection:'row'}}>
              <View style={{flex: 2, alignItems:'center',margin:6, justifyContent:'center', backgroundColor:'#fff', borderTopLeftRadius:20, borderBottomLeftRadius:20}}>
               <Notificacionsvg width="80" height="20"/>
                </View>
              <View style={{flex:11}}>
            <Card style={{marginLeft:5, marginRight:5}}>
            <CardItem  style={{backgroundColor:'#F96060'}}>
            <View style={styles.leftContainer}>
            <Text style={{fontFamily:'roboto-black', color:'#FFF'}}>Refuerzo uno </Text>
            </View>
            <Text style={{color:'#FFF'}}>{proxCuota.fecha_refuerzo1}</Text>
            </CardItem>
            </Card></View>
            </View> : null}
            {banderaRefuerzo2?
            <View style={{display:'flex', flexDirection:'row'}}>
            <View style={{flex: 2, alignItems:'center',margin:6, justifyContent:'center', backgroundColor:'#fff', borderTopLeftRadius:20, borderBottomLeftRadius:20}}>
             <Notificacionsvg width="20" height="20"/>
              </View>
            <View style={{flex:11}}>
          <Card style={{marginLeft:5, marginRight:5}}>
          <CardItem  style={{backgroundColor:'#F96060'}}>
          <View style={styles.leftContainer}>
          <Text style={{fontFamily:'roboto-black', color:'#FFF'}}>Refuerzo dos </Text>
          </View>
          <Text style={{color:'#FFF'}}>{proxCuota.fecha_refuerzo2}</Text>
          </CardItem>
          </Card></View>
          </View> : null}
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
            </View>{(isNaN(proxCuota.cant_cuotas - proxCuota.abonadas))?<Text></Text>:
            <Text style={{alignSelf:'center', margin:10}}>{proxCuota.cant_cuotas - proxCuota.abonadas}</Text>
            }
            </Card>
            {Object.keys(cuotas).length>0 ?
            <View style={{ flex: 1 }}>
              {cuotas[0].numero != 0 ?
              <Card style={{marginLeft: 5,
                               marginRight: 5,
                               padding: 5,
                               borderRadius:4}}>
                                 
                <FlatList
                    data={cuotas}
                    initialNumToRender={2}
                    renderItem={({item}) => ( item.observacion == 'ADELANTO' ? 
                    <Cuota name={item} color={'#E4FFE5'} /> :  <Cuota name={item} color={'#FFF'} />)}
                    ItemSeparatorComponent = { FlatListItemSeparator }
                />
                </Card>:null}
              </View>:null }
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
    fontSize:18,
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
},
selectLabelTextStyle:{
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
},
placeHolderTextStyle: {
  color: "#D3D3D3",
  padding: 10,
  textAlign: "left",
  width: "99%",
  flexDirection: "row"
},
dropDownImageStyle: {
  marginLeft: 10,
  width: 10,
  height: 10,
  alignSelf: "center"
},
itemSeparatorStyle:{
  height: 1,
  width: "90%",
  alignSelf: "center",
  backgroundColor: "#D3D3D3"
},
pickerStyle: {
  marginLeft: 18,
  elevation:3,
  paddingRight: 25,
  marginRight: 10,
  marginBottom: 2,
  shadowOpacity: 1.0,
  shadowOffset: {
    width: 1,
    height: 1
  },
  borderWidth:1,
  shadowRadius: 10,
  backgroundColor: "rgba(255,255,255,1)",
  shadowColor: "#d3d3d3",
  borderRadius: 5,
  flexDirection: "row"
},
halfcircle :{
  backgroundColor: '#000',
  borderTopRightRadius: 110,  /* 100px of height + 10px of border */
  borderBottomRightRadius: 110,
}
});