import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {signInThunk} from '../store/middlewares/auth.thunk';
import Logo from './../assets/logo.png';
import {useAppDispatch} from '../store';

type RootStackParamList = {
  home: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList>;

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({username: '', password: ''});

  const handleSubmit = () => {
    dispatch(
      signInThunk({...formData, navigate: () => navigation.navigate('home')}),
    );
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={text => setFormData({...formData, username: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={formData.password}
        onChangeText={text => setFormData({...formData, password: text})}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#1E1D1D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
