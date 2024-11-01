import React, { useState } from 'react';
import { View, Image, Button, Text, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { TextInput } from 'react-native-gesture-handler';

import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation, setIsLoggedIn, isLoggedIn  }) => {
  const [emailLogin, setEmailLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const AndroidClientId = Constants.expoConfig?.extra?.androidClientId;
  const IosClientId = Constants.expoConfig?.extra?.IosClientId;
  const WebClientId = Constants.expoConfig?.extra?.WebClientId;
  const apiKey = Constants.expoConfig?.extra?.firebaseConfig?.apiKey;
  const authDomain = Constants.expoConfig?.extra?.firebaseConfig?.authDomain;
  const projectId = Constants.expoConfig?.extra?.firebaseConfig?.projectId;
  const storageBucket = Constants.expoConfig?.extra?.firebaseConfig?.storageBucket;
  const messagingSenderId = Constants.expoConfig?.extra?.firebaseConfig?.messagingSenderId;
  const appId = Constants.expoConfig?.extra?.firebaseConfig?.appId;
  const measurementId = Constants.expoConfig?.extra?.firebaseConfig?.measurementId;

  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  //const redirectUriLocal = 'https://auth.expo.io/@caueuliani/PausaAcucarada';
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: AndroidClientId,
    iosClientId: IosClientId,
    webClientId: WebClientId,
    redirectUri: makeRedirectUri({
      scheme: 'https',
      path: '/@caueuliani/PausaAcucarada',
    }),
    scopes:  ['openid', 'profile', 'email']

  });

  const handleEmailLogin = () => {
    if(email !== '' && senha !== '') {
      signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Login com sucesso', 'Login efetuado com sucesso! Indo para a Home');
        setIsLoggedIn(true);
        console.log("user logado");
        setTimeout(() => {
          navigation.navigate('Home');
        }, 100);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if(errorCode === 'auth/invalid-credential') {
          Alert.alert(
            'Usuário não encontrado',
            'Nenhum usuário encontrado com esse email. Você gostaria de se cadastrar?',
            [
              {
                text: 'Cancelar',
                style: 'cancel',
              },
              {
                text: 'Cadastrar',
                onPress: () => navigation.navigate('Registre-se'),
              },
            ]
          );
        } else {
          Alert.alert('Erro', errorMessage);
        }
      });
    } else {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
  };

  const userLogin = async () => {
    if (request) {
      try {
        const result = await promptAsync();
        if (result.type === 'success') {
          const accessToken  = result.authentication.accessToken;
          if(accessToken) {
            const credential = GoogleAuthProvider.credential(null, accessToken);
            const userCredential = await signInWithCredential(auth, credential);
            setIsLoggedIn(true);
            Alert.alert(
              'Login com sucesso',
              'Você foi logado com sucesso!',
              [
                {
                  text: 'OK',
                  onPress: () => console.log('OK pressionado'),
                },
              ]
            );
            setTimeout(() => {
              navigation.navigate('Home');
            }, 100);
          }
          else {
            console.error('ID Token não encontrado:', result.authentication);
          }
        }
        else {
          console.log('Login cancelado pelo usuário');
        }
      } catch (error) {
        console.error('Erro ao chamar promptAsync:', error);
        Alert.alert('Erro', 'Não foi possível fazer login. Tente novamente.');
      }
    } else {
      console.log('Request não está pronta ainda');
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
              <Button title="Login" onPress={(handleEmailLogin)} />
            </View>
          )
        }
      </View>
    </View>
  );
};

export default Login;