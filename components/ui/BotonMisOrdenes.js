import React from 'react';
import {Button, Text} from 'native-base';
import globalStyles from '../../styles/global';
import {useNavigation} from '@react-navigation/native';


const BotonMisOrdenes = () => {

    const navigation = useNavigation();


    return ( 
        <Button 
        style={[globalStyles.boton,{marginTop:15} ]} 
        onPress={() => navigation.navigate("Ordenes")}
        block
        rounded
        >
            <Text style={globalStyles.botonTexto}>Ordenes</Text>
        </Button>
     );
}


export default BotonMisOrdenes;