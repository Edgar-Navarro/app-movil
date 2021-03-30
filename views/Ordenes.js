import React, {useState, Fragment, useEffect} from 'react';
import {Container, Content, List, ListItem, Text, Toast, Body, Button} from 'native-base';
import globalStyles from '../styles/global';
import { StyleSheet } from 'react-native';
import clienteAxios from '../config/axios';


const MisOrdenes = () => {
    const [ordenes, guardarOrdenes] = useState([]);
    const [status, guardarStatus] = useState(true);
    const [refresh, guardarRefresh] = useState(true);
    const [mensaje, guardarMensaje] = useState(null);

    
    const eliminarOrden = async (id) =>{
        try {
              const options = {
                headers: { 
                    'Accept': 'application/json'
                  }
              };
            await clienteAxios.delete(`/api/orders/${id}`,options);
            guardarMensaje("Eliminado correctamente");
            if(refresh){
                guardarRefresh(false);
            }else{
                guardarRefresh(true);
            }
        } catch (error) {
            guardarMensaje(error.message);
        }
    }

    useEffect(() =>{
        const consulta = async () => {
            const {data} = await clienteAxios.get("/api/orders");
            guardarOrdenes(data);
            guardarStatus(false);
        }
        consulta();
    },[refresh])

    if(status) return <Text style={styles.completo}>Cargando...</Text>;

    const mostarAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'OK',
            duration: 5000
        })
    }
    return ( 
      <Container style={globalStyles.contenedor}>
        <Content style={{ backgroundColor: '#FFF' }}>
          <List>
            {ordenes.map((miOrden, i) => {
              var { Crust, Flavor, Order_ID, Size, Table_No, Timestamp } = miOrden;
              const fecha = new Date(Timestamp);
              let day = fecha.getDate()
              let month = fecha.getMonth() + 1
              let year = fecha.getFullYear()
              let date = "";
              if(month < 10){
                date = `${day}-0${month}-${year}`;
              }else{
                date = `${day}-${month}-${year}`;
              }

              return (
                <Fragment key={Order_ID}>
                  <ListItem>
                    <Body>
                      <Text>Orden N° {Order_ID}</Text>                    
                      <Text>Crust: {Crust} </Text>
                      <Text>Flavor: {Flavor} </Text>
                      <Text>Size: {Size} </Text>
                      <Text>Table No: {Table_No} </Text>
                      <Text>created: {date} </Text>
                    </Body>
                    <Button
                      onPress={ () => {
                        eliminarOrden(Order_ID);
                    }}
                      full
                      dark
                      style={{ marginTop: 20, backgroundColor: 'rgb(180, 8, 8)' }}
                    >
                      <Text style={[globalStyles.botonTexto]}>Eliminar</Text>
                    </Button>
                  </ListItem>
                </Fragment>
              )
            })}
          </List>
        </Content>
        {mensaje && mostarAlerta()}
      </Container>
     );
}

const styles = StyleSheet.create({

  completo: {
      fontWeight: 'bold',
      textTransform: 'uppercase'
  }
})
 
export default MisOrdenes;