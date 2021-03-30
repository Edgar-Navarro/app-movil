import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Button, Text} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import BotonMisOrdenes from '../components/ui/BotonMisOrdenes';

const NuevaOrden = () => {
    const navigation = useNavigation();

    return ( 
        <Container style={globalStyles.contenedor}>
            <View style={[globalStyles.contenido, style.contenido]}>
                <Button
                block
                rounded
                style={globalStyles.boton}
                onPress={ () => navigation.navigate('Creacion')}
                >
                    <Text style={globalStyles.botonTexto}>Crear Nueva Orden</Text>
                </Button>
                <BotonMisOrdenes />
            </View>
        </Container>
     );
}

const style = StyleSheet.create({
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center'

    }
})
 
export default NuevaOrden;