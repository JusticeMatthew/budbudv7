import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';

import { UserContext } from '../context/UserContext';
import { FirebaseContext } from '../context/FirebaseContext';

import Text from '../components/Text';
import colors from '../design/colors';

export default LoadingScreen = () => {
  const [_, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    setTimeout(async () => {
      const user = firebase.getCurrentUser();

      if (user) {
        const userInfo = await firebase.getUserInfo(user.uid);

        setUser({
          isLoggedIn: true,
          email: userInfo.email,
          uid: user.uid,
          name: userInfo.name,
        });
      } else {
        setUser((state) => ({ ...state, isLoggedIn: false }));
      }
    }, 2000);
  }, []);

  return (
    <Container>
      <StatusBar style='light' />
      <Text title color={colors.green} style={{ fontSize: 48 }}>
        BudBud
      </Text>
      <LottieView
        source={require('../../assets/spinner.json')}
        autoPlay
        loop
        style={{ width: '60%' }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.blue};
`;
