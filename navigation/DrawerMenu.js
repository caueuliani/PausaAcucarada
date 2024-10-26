import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Cart from '../screens/Cart';
import Menu from '../screens/Menu';
import ProductDetail from '../screens/ProductDetail';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Detalhes" component={ProductDetail} />
      <Stack.Screen name="Registre-se" component={Register} />
    </Stack.Navigator>
  );
};
const DrawerMenu = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Perfil" component={Profile} />
        <Drawer.Screen name="Carrinho" component={Cart} />
        <Drawer.Screen name="Cardápio" component={Menu} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerMenu;
