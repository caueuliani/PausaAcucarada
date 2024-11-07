import React, { useState, useEffect } from 'react';
import { View, Image, Text, Alert, Platform, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const handleAsyncGetUserinfo = async () => {
    setEmail(await AsyncStorage.getItem('email'));
    setUserName(await AsyncStorage.getItem('userName'));
  }

  useEffect(() => {
    handleAsyncGetUserinfo();
    console.log(email, userName);
  }, []);
  return (
    <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Image source={require('../assets/PausaLogo.png')} style={{ width: 200, height: 200, marginBottom: 24 }} />    
      <View style={{ width: 300 }}>
        <Text>E-mail: </Text>
        <TextInput 
        placeholder="Email"
        placeholderTextColor={'gray'}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email? email : ''}
        onChangeText={(text) => setEmail(text)} 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }} />
        <Text>Nome Completo: </Text>
        <TextInput 
        placeholder="Name"        
        placeholderTextColor={'gray'}
        value={userName? userName : ''}
        onChangeText={(text) => setUserName(text)} 
        autoCapitalize="words"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }} />
        <Text>Endereço: </Text>
        <TextInput 
        placeholder="Endereço"        
        placeholderTextColor={'gray'}
        value={userAddress? userAddress : ''}
        onChangeText={(text) => setUserAddress(text)} 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }} />
        <Text>Celular: </Text>
        <TextInput
        type={'custom'} 
        placeholder="(dd) x xxxx-xxxx"    
        placeholderTextColor={'gray'}
        maxLength={11}
        inputMode='numeric'
        value={userPhone? userPhone : ''}
        keyboardType="numeric"
        onChangeText={(text) => setUserPhone(text)} 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }} />
        <Button title="Salvar Dados" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

export default Profile;
