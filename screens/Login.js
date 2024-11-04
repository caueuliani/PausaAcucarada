import React, { useEffect, useState } from 'react';
import { View, Image, Button, Text, Alert, Platform  } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { TextInput } from 'react-native-gesture-handler';
import { auth, useGoogleAuthRequest } from '../config/authConfig';

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation, setIsLoggedIn, isLoggedIn  }) => {
  const { request, promptAsync } = useGoogleAuthRequest();

  const [emailLogin, setEmailLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  

  const handleEmailLogin = async () => {
    if (email !== '' && senha !== '') {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        setIsLoggedIn(true);
        showAlert('Login Bem-sucedido', 'Seja bem-vindo(a)!', () => navigation.navigate('Profile'));
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/invalid-credential') {
          showAlertWithCallback('Usuário não encontrado',
              'Nenhum usuário encontrado com esse email. Você gostaria de se cadastrar?',
            ()=> navigation.navigate('Register'),
            ()=> console.log('Verifique seu usuário e/ou Senha'))
        } else {
          showAlert('Erro', errorMessage);
        }
      }
    } else {      
        showAlert('Erro', 'Preencha todos os campos.');
      }
  };  

  const userLogin = async () => {
    if (request) {
      try {
        const result = await promptAsync();
        if (result.type === 'success') {
          const accessToken  = result.authentication.accessToken;
          console.log(result, 'result, cade os dados do user logado?');
          if(accessToken) {
            const credential = GoogleAuthProvider.credential(null, accessToken);
            const userCredential = await signInWithCredential(auth, credential);
            console.log(userCredential, 'userCredential');
            setIsLoggedIn(true);
            showAlert('Login Bem-sucedido', 'Seja bem-vindo(a)!', () => navigation.navigate('Profile'));
          }
          else {
            console.error('ID Token não encontrado:', result.authentication);
          }
        }
        else {
          showAlert('Login Cancelado', 'Login cancelado pelo usuário');
        }
      } catch (error) {
        console.error('Erro ao chamar promptAsync:', error);
        showAlert('Erro', 'Não foi possível fazer login. Tente novamente.');
      }
    }
  };

  const showAlertWithCallback = (title, message, onPressOk = () => {}, onPressCancel = () => {}) => {
    if (Platform.OS === 'web') {
      const confirmacao =window.confirm(message);
      if(confirmacao) { 
        onPressOk();
      }
      else{
        window.alert('Verifique seu usuário e/ou Senha');
      }
    } else {
      Alert.alert(
        title, 
        message, [
          { text: 'OK', onPress: onPressOk },
          { text: 'Não', onPress: onPressCancel, style: 'cancel' }
        ]);
    }
  };

  const showAlert = (title, message, onPressOk = () => {}) => {
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert(title, message, [{ text: 'OK', onPress: onPressOk }]);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Image source={require('../assets/PausaLogo.png')} style={{ width: 200, height: 200, marginBottom: 24 }} />    
      <View style={{ width: 300 }}>
        <Button title="Login com Google" onPress={userLogin} />
        <Text style={{ marginTop: 16, fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginBottom: 16 }}>Ou</Text>
        <Button title="Login com Email" onPress={() => setEmailLogin(true)} />
        {emailLogin && 
          (
            <View style={{ width: 300 }}>
              <Text style={{ marginTop: 16, marginBottom: 16 }}>Email:</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                placeholder="Email"
              />
              <Text style={{ marginTop: 16, marginBottom: 16 }}>Senha:</Text>
              <TextInput
                value={senha}
                onChangeText={setSenha}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }}
                placeholder="Senha"
                secureTextEntry
              />
              <Button title="Login" onPress={handleEmailLogin} />
            </View>
          )
        }
      </View>
    </View>
  );
};

export default Login;