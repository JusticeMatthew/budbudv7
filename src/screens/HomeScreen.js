import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { UserContext } from '../context/UserContext';
import { FirebaseContext } from '../context/FirebaseContext';

import Text from '../components/Text';
import colors from '../design/colors';
import tempData from '../../tempData';

export default HomeScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const renderBud = ({ item }) => (
    <PostContainer>
      <PostContent>
        <Text large center>
          {item.name}
        </Text>
        <Text medium>Price: {item.price}</Text>
        <Text medium>Type of Medicine: {item.type}</Text>
        <Text medium>Purchased at: {item.location}</Text>
        <Text medium>THC Percentage: {item.thc}</Text>
        <Text medium>CBD Percentage: {item.cbd}</Text>
      </PostContent>
    </PostContainer>
  );

  return (
    <Container>
      <StatusBar style='dark' />
      <BudContainer>
        <Text title center style={{ color: 'whitesmoke' }}>
          {user.name}'s Buds
        </Text>
        <Buds
          data={tempData}
          renderItem={renderBud}
          keyExtractor={(item) => item.id}
        />
      </BudContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.blue};
  padding-top: 32px;
`;

const BudContainer = styled.View``;

const Buds = styled.FlatList``;

const PostContainer = styled.View`
  background-color: whitesmoke;
  margin: 12px 32px;
  border-radius: 6px;
  border-left-width: 4px;
  border-left-color: ${colors.green};
`;

const PostContent = styled.View`
  margin: 8px;
`;
