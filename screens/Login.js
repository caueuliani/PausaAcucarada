import React, { useState } from 'react';
import { View, TextInput, Text , TouchableOpacity, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState(false);
    const userLogin = () => {
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
          <Image source={require('../assets/PausaLogo.png')} style={{ width: 200, height: 200, marginBottom: 24 }} />    
          <View style={{ width: 300 }}>
            <Button title="Entrar com o Google" onPress={userLogin} />
          </View>
        </View>
      );
};

export default Login;
