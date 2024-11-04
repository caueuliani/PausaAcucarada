import React from 'react';
import { View, Image, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Register = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Image source={require('../assets/PausaLogo.png')} style={{ width: 200, height: 200, marginBottom: 24 }} />    
      <View style={{ width: 300 }}>
        <Text style={{ marginTop: 16, fontWeight: 'bold', fontSize: 16, marginBottom: 16 }}>Nome completo:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }} />
        <Text style={{ marginTop: 16, fontWeight: 'bold', fontSize: 16, marginBottom: 16 }}>Email:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }} />
        <Text style={{ marginTop: 16, fontWeight: 'bold', fontSize: 16, marginBottom: 16 }}>Senha:</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }} />
        <Button title="Criar uma conta" />
      </View>
    </View>
  );
};

export default Register;
