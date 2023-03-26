import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { LogBox } from 'react-native';

import Header from '../components/Header.js';
import colors from '../design/colors';
import Text from '../components/Text';

import { FirebaseContext } from '../context/FirebaseContext.js';
import { UserContext } from '../context/UserContext';

LogBox.ignoreLogs(['Setting a timer']);
export default SignupScreen = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [buds, setBuds] = useState([]);
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const signup = async () => {
    setLoading(true);

    const user = { name, email, password, buds };

    try {
      const createdUser = await firebase.createUser(user);

      if (createdUser) {
        setUser({ ...createdUser, isLoggedIn: true, firstLogin: true });
      }
    } catch (error) {
      console.log('Error @Signup: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container behavior="padding">
      <StatusBar style="light" />
      <Header />

      <Main>
        <Text title center style={{ color: 'whitesmoke' }}>
          Create an account
        </Text>
      </Main>

      <Auth>
        <AuthContainer>
          <AuthTitle>First Name</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(name) => setName(name.trim())}
            value={name}
          />
        </AuthContainer>

        <AuthContainer>
          <AuthTitle>Email Address</AuthTitle>
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

      <SignupContainer onPress={signup} disabled={loading}>
        {loading ? <Loading /> : <SignupButton>Signup</SignupButton>}
      </SignupContainer>

      <Login onPress={() => navigation.navigate('Login')}>
        <Text small center style={{ color: 'whitesmoke' }}>
          Already have an account?{' '}
          <Text style={{ color: colors.green, fontWeight: 'bold' }}>Login</Text>
        </Text>
      </Login>
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

const SignupContainer = styled.TouchableOpacity`
  margin: 0 64px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.green};
  border-radius: 6px;
`;

const SignupButton = styled(Text)`
  font-weight: bold;
  font-size: 24px;
  color: ${colors.blue};
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: colors.blue,
  size: 'small',
}))``;

const Login = styled.TouchableOpacity`
  margin-top: 48px;
`;
