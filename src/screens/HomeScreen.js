import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swipeable } from 'react-native-gesture-handler';
import { Animated } from 'react-native';

import { UserContext } from '../context/UserContext';
import { FirebaseContext } from '../context/FirebaseContext';

import Text from '../components/Text';
import colors from '../design/colors';

export default HomeScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [buds, setBuds] = useState([]);

  useEffect(() => {
    firebase.getBuds(user.uid).then((res) => setBuds(res));
  }, [buds]);

  const rightActions = (dragX, docID) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    });

    return (
      <DeleteButton onPress={() => firebase.deleteBud(docID)}>
        <Animated.View>
          <Animated.Text
            style={{
              fontSize: 18,
              color: 'whitesmoke',
              transform: [{ scale }],
            }}
          >
            Delete
          </Animated.Text>
        </Animated.View>
      </DeleteButton>
    );
  };

  const renderBud = ({ item }) => (
    <Swipeable renderRightActions={(_, dragX) => rightActions(dragX, item.id)}>
      <PostContainer>
        <PostContent>
          <Text large center>
            {item.name}
          </Text>
          <Text medium>Price: {item.price}</Text>
          <Text medium>Type of Medicine: {item.type}</Text>
          <Text medium>Purchased at: {item.location}</Text>
          <Text medium>THC Amount: {item.thc}</Text>
          <Text medium>CBD Amount: {item.cbd}</Text>
        </PostContent>
      </PostContainer>
    </Swipeable>
  );

  return (
    <Container>
      <StatusBar style='dark' />
      <BudContainer>
        <Text title center style={{ color: 'whitesmoke' }}>
          {user.name}'s Buds
        </Text>
        <Buds
          data={buds}
          renderItem={renderBud}
          keyExtractor={(item) => item.name}
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

const Buds = styled.FlatList`
  margin: 18px 0 48px;
`;

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

const DeleteButton = styled.TouchableOpacity`
  height: 48px;
  width: 72px;
  background-color: red;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;
