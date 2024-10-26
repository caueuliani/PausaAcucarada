import React from 'react';
import { View, Text, Button } from 'react-native';

const ProductDetail = ({ navigation }) => {
  return (
    <View>
      <Text>Product Detail Screen</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

export default ProductDetail;
