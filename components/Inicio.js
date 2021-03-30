import React, {useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';


import Login from '../views/Login';
import NuevaOrden from '../views/NuevaOrden';
import Logout from '../components/ui/Logout';
import Creacion from '../views/Creacion';
import Ordenes from '../views/Ordenes';
import LoginContext from '../context/login/loginContext';




const Stack = createStackNavigator();

const Inicio = () => {

    const {userToken,isLoading, bootstrapAsync} = useContext(LoginContext);



    useEffect(() => {
      const llamarToken = async () => {
          let userToken;
    
          try {
            userToken = await AsyncStorage.getItem('token');
          } catch (e) {
          }    
          bootstrapAsync(userToken);
      };
  
      llamarToken();
    }, []);

      
      if (isLoading) {
        return <Text>Cargando...</Text>;
      }
  
    return (  
        
 
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'blue'
          },
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTintColor: '#FFF'
        }}
      >
           {userToken == null ? (
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                title: "Iniciar Sesión",
                headerShown: false,

                }}
            />
           ) : (
            
            <>
            <Stack.Screen
                name="NuevaOrden"
                component={NuevaOrden}
                options={{
                  title: "Inicio",
                  headerLeft: false,
                  headerRight: props => <Logout />

                }}
             />

            <Stack.Screen
                name="Creacion"
                component={Creacion}
                options={{
                  title: "Crear Orden",
                }}
              />
            <Stack.Screen
                name="Ordenes"
                component={Ordenes}
                options={{
                  title: "Ordenes",
                }}
              />
            </>

           )}

      </Stack.Navigator>



    );
}
 
export default Inicio;