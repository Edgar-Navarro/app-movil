import React, {useContext} from 'react';
import {Button, Text} from 'native-base';
import globalStyles from '../../styles/global';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import LoginContext from '../../context/login/loginContext';



const MisOrdenes = () => {
    const {cerrarSesion} = useContext(LoginContext);
    const navigation = useNavigation();

const cerrarSesionApp = async () =>{
    
    await AsyncStorage.removeItem('token');
    cerrarSesion();
    navigation.navigate("Login");

}


    return ( 
        <Button style={globalStyles.boton} onPress={() => cerrarSesionApp()}>
            <Text style={globalStyles.botonTexto}>Cerra Sesión</Text>
        </Button>
     );
}
 
export default MisOrdenes;

