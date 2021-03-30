import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Root} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';
import Inicio from './components/Inicio';
import LoginState from './context/login/loginState';


const Stack = createStackNavigator();


const App = () => {


  return (
    <>
    <Root>
    <LoginState>
     <NavigationContainer>
       <Inicio />
     </NavigationContainer>
     </LoginState>
     </Root>
    </>
  );
};

export default App;
