import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { StyleSheet } from 'react-native';

import { FirebaseContext } from '../context/FirebaseContext';
import { UserContext } from '../context/UserContext';

import Header from '../components/Header.js';
import colors from '../design/colors';
import Text from '../components/Text';

export default LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const login = async () => {
    setLoading(true);

    try {
      await firebase.login(email, password);
      const uid = firebase.getCurrentUser().uid;
      const userInfo = await firebase.getUserInfo(uid);

      setUser({
        name: userInfo.name,
        email: userInfo.email,
        uid,
        isLoggedIn: true,
        firstLogin: false,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordResetHandler = () => {
    if (email) {
      firebase.passwordReset(email);
      alert('Password reset email sent.');
    }
  };

  return (
    <Container behavior="padding">
      <StatusBar style="light" />
      <Header />

      <Main>
        <Text title center style={{ color: 'whitesmoke' }}>
          Welcome Back
        </Text>
      </Main>

      <Auth>
        <AuthContainer>
          <AuthTitle>Email</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email.trim())}
            value={email}
          />
        </AuthContainer>

        <AuthContainer>
          <AuthTitle>Password</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password.trim())}
            value={password}
          />
        </AuthContainer>
      </Auth>

      <LoginContainer onPress={login} disabled={loading}>
        {loading ? <Loading /> : <LoginButton>Login</LoginButton>}
      </LoginContainer>

      <Signup onPress={() => navigation.navigate('Signup')}>
        <Text small center style={{ color: 'whitesmoke' }}>
          New To BudBud?{' '}
          <Text style={{ color: colors.green, fontWeight: 'bold' }}>
            Signup
          </Text>
        </Text>
      </Signup>
      <Reset onPress={() => passwordResetHandler()}>
        <Text small center style={{ color: 'whitesmoke' }}>
          Forgot password?
        </Text>
      </Reset>
    </Container>
  );
};

const Container = styled.KeyboardAvoidingView`
  background-color: ${colors.blue};
  flex: 1;
  justify-content: center;
`;

const Main = styled.View`
  margin-top: 30px;
`;

const Auth = styled.View`
  margin: 64px 32px 32px;
`;

const AuthContainer = styled.View`
  margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
  color: whitesmoke;
  font-size: 12px;
  text-transform: uppercase;
`;

const AuthField = styled.TextInput`
  border-bottom-color: whitesmoke;
  border-bottom-width: 0.5px;
  height: 48px;
  color: whitesmoke;
`;

const LoginContainer = styled.TouchableOpacity`
  margin: 0 64px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.green};
  border-radius: 6px;
`;

const LoginButton = styled(Text)`
  font-weight: bold;
  font-size: 24px;
  color: ${colors.blue};
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: colors.blue,
  size: 'small',
}))``;

const Signup = styled.TouchableOpacity`
  margin-top: 48px;
  margin-bottom: 24px;
`;

const Reset = styled.TouchableOpacity``;
