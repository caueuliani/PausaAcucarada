import React from 'react';
import { View, Text, Button } from 'react-native';

const Cart = ({ navigation }) => {
  return (
    <View>
      <Text>Cart Screen</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

export default Cart;
