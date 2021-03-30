import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    contenido:{
        marginHorizontal: '2.5%',
        flex: 1
    },
    boton: {
        backgroundColor: 'blue'
    },
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF'
    },
    titulo:{
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20,
        fontSize: 30
    },
    imagen: {
        height: 300,
        width: '100%'
    },
    cantidad: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    enlace:{
        marginTop: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase'
    }
})

export default globalStyles;