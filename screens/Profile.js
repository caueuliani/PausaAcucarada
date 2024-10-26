import React from 'react';
import { View, Text, Button } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <View>
      <Text>profile Screen</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default Profile;
