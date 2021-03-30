import React, {useState,useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Button, Text, H1, Input, Form, Item, Toast} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import clienteAxios from '../config/axios';
import LoginContext from '../context/login/loginContext';



const CrearCuenta = () => {
    const [Crust, guardarCrust] = useState('');
    const [Flavor, guardarFlavor] = useState('');
    const [Size, guardarSize] = useState('');
    const [Table_No, guardarTable] = useState('');
    const {cerrarSesion} = useContext(LoginContext);
    const [mensaje, guardarMensaje] = useState(null);

    const navigation = useNavigation();


    const handleSubmit = async () => {
        if(Crust.trim() === ''|| Flavor.trim() === '' || Size.trim() === '' || Table_No.trim() === '' ){
            guardarMensaje('Todos los campos son obligatorios');
            return;
        }
        if(Number.isNaN(Number(Table_No))){
            guardarMensaje('Table No, tiene que ser numérico');
            return;
        }

        try {
            let userToken = await AsyncStorage.getItem('token');
            var datos = JSON.stringify({
                Crust,
                Flavor,
                Size,
                Table_No: Number(Table_No)
              });
              const options = {
                headers: { 
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json', 
                    'authorization': `Bearer ${userToken}`
                  }
              };
               await clienteAxios.post("/api/orders",datos,options);
            guardarMensaje("Orden Creada");
            navigation.navigate('Ordenes');
        } catch (error) {
            const code = error.message.replace('Request failed with status code ', '');
            if(code === '401'){
                guardarMensaje("Sesión vencida");
                await AsyncStorage.removeItem('token');
                cerrarSesion();
                navigation.navigate("Login");
            }else if(code === '409'){
                guardarMensaje("El campo Table No, repetido");
            }else{
                guardarMensaje(error.message);
            }
            
        }

    }

    const mostarAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'OK',
            duration: 5000
        })
    }


   
    return ( 
        <Container style={globalStyles.contenedor} >
            <View style={[globalStyles.contenido,style.contenido]} >
                <H1 style={style.titulo} >Crear Nueva Orden</H1>
                <Form>
                    <Item inlineLabel last style={style.input}>
                        <Input 
                        placeholder="Crust"
                        onChangeText={texto => guardarCrust(texto)}
                        /> 
                    </Item>
                    <Item inlineLabel last style={style.input}>
                        <Input 
                        placeholder="Flavor"
                        onChangeText={texto => guardarFlavor(texto)}
                        /> 
                    </Item>
                    <Item inlineLabel last style={style.input}>
                        <Input 
                        placeholder="Size"
                        onChangeText={texto => guardarSize(texto)}
                        /> 
                    </Item>
                    <Item inlineLabel last style={style.input}>
                        <Input 
                        placeholder="Table No"
                        onChangeText={texto => guardarTable(texto)}
                        /> 
                    </Item>
                </Form> 
                <Button 
                square 
                block 
                style={globalStyles.boton}
                onPress={ () => handleSubmit()} 
                >
                    <Text style={globalStyles.botonTexto} >Crear Cuenta</Text>
                </Button>  
                  {mensaje && mostarAlerta()}
            </View>
        </Container>
     );
}

const style = StyleSheet.create({
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
        flex: 1
    },
    input:{
        marginBottom: 10
    },
    titulo:{
        textAlign: 'center',
        marginTop: 0,
        marginBottom: 10,
        fontSize: 30
    }
});
 
export default CrearCuenta;