import React from 'react';
import { View, Text, Button } from 'react-native';

const Register = ({ navigation }) => {
  return (
    <View>
      <Text>Register Screen</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

export default Register;
