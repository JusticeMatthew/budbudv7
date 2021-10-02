import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../context/UserContext';
import { FirebaseContext } from '../context/FirebaseContext';

import Text from '../components/Text';
import colors from '../design/colors';

export default ProfileScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const logout = async () => {
    const loggedOut = await firebase.logout();

    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };

  return (
    <Container>
      <StatusBar style='dark' />
      <Text>User ID: {user.uid}</Text>

      <Logout onPress={logout}>
        <Text medium color='whitesmoke'>
          Logout
        </Text>
      </Logout>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  margin-top: 64px;
  flex: 1;
`;

const Logout = styled.TouchableOpacity`
  margin: 64px;
  color: whitesmoke;
  background-color: ${colors.blue};
  height: 48px;
  width: 112px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;
