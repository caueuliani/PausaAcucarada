import React from 'react';
import { View, Text, Button } from 'react-native';

const Menu = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

export default Menu;
