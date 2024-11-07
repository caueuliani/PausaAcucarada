import React, { useState, useEffect, useRef } from 'react';
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
import { getAuth } from 'firebase/auth';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Detalhes" component={ProductDetail} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const AuthStack = ({ setIsLoggedIn }) => {
  
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" >
        {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const DrawerMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigationRef = React.useRef();

  const checkUserSession = async () => {
    const auth = getAuth();
    return auth.currentUser;
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await checkUserSession();
      if (user) {
        setIsLoggedIn(true);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    // Redireciona para 'Profile' após o login bem-sucedido
    if (isLoggedIn && navigationRef.current) {
      navigationRef.current.navigate('Profile');
    }
  }, [isLoggedIn]);


  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Carrinho" component={Cart} />
        <Drawer.Screen name="Cardapio" component={Menu} />
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
      )
      :
      (
        <AuthStack setIsLoggedIn={setIsLoggedIn}  />
      )}
    </NavigationContainer>
  );
};

export default DrawerMenu;
