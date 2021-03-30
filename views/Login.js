import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Button, Text, H1, Input, Form, Item, Toast} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import LoginContext from '../context/login/loginContext';
import clienteAxios from '../config/axios';


const Login = () => {
    const {iniciarSesion} = useContext(LoginContext);
    const navigation = useNavigation();
    const [username, guardarUsername] = useState('');
    const [password, guardarPassword] = useState('');
    const [mensaje, guardarMensaje] = useState(null);

    const handleSubmit = async () =>{

        if(username.trim() === '' || password.trim() === ''){
           guardarMensaje('Todos los campos son obligatorios');
           return;
       }

       try {
     
        var credenciales = JSON.stringify({
            password,
            username
          });
          const options = {
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
              }
          };
           const {data} = await clienteAxios.post("/api/auth",credenciales,options);

           const token = data.access_token; 

           await AsyncStorage.setItem('token',token);

           iniciarSesion();

           navigation.navigate('NuevaOrden');
           
       } catch (error) {
           guardarMensaje("usuario o password incorrecto");
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
                <H1 style={globalStyles.titulo} >Iniciar Sesión</H1>
                <Form>
                    <Item inlineLabel last style={style.input} >
                        <Input 
                        placeholder="Username"
                        onChangeText={texto => guardarUsername(texto)}
                        /> 
                    </Item>
                    <Item inlineLabel last style={style.input}>
                        <Input 
                        placeholder="Password" 
                        secureTextEntry={true}
                        onChangeText={texto => guardarPassword(texto)}
                        /> 
                    </Item>
                </Form> 
                <Button 
                square 
                block 
                style={globalStyles.boton} 
                onPress={() => handleSubmit()}
                >
                    <Text style={globalStyles.botonTexto} >Aceptar</Text>
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
        marginBottom: 20
    }
});
 
export default Login;