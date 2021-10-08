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
      <StatusBar style='light' />
      <Text center title style={{ color: 'whitesmoke' }}>
        Profile
      </Text>
      <Text center title style={{ color: 'whitesmoke', marginHorizontal: 64 }}>
        Profile/stats page coming soon!
      </Text>

      <Logout onPress={logout}>
        <Text medium center color='whitesmoke'>
          Logout
        </Text>
      </Logout>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.blue};
  padding-top: 64px;
  justify-content: space-between;
  align-items: center;
`;

const Logout = styled.TouchableOpacity`
  margin: 64px;
  color: whitesmoke;
  background-color: black;
  height: 48px;
  width: 112px;
  border-radius: 4px;
  justify-content: center;
  align-self: center;
`;
