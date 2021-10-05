import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swipeable } from 'react-native-gesture-handler';
import { Animated, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';
import 'firebase/firestore';

import { UserContext } from '../context/UserContext';
import { FirebaseContext } from '../context/FirebaseContext';

import Text from '../components/Text';
import colors from '../design/colors';

export default HomeScreen = () => {
  const [user] = useContext(UserContext);
  const fireboss = useContext(FirebaseContext);
  const [buds, setBuds] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('buds')
      .onSnapshot((snapshot) => {
        const budData = [];
        snapshot.forEach((doc) => {
          budData.push(doc.data());
        });
        setBuds(budData);
      });

    return unsubscribe;
  }, []);

  const toggleFavorite = (docID) => {
    fireboss.setFavorite(docID);
  };

  const rightActions = (dragX, docID) => {
    const scale = dragX.interpolate({
      inputRange: [-100, -20],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    });

    return (
      <DeleteButton onPress={() => fireboss.deleteBud(docID)}>
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
      {item.favorite === true ? (
        <PostContainer>
          <PostContent>
            <PostHeader>
              <Text large>{item.name}</Text>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                {item.favorite ? (
                  <AntDesign name='heart' size={32} color={colors.green} />
                ) : (
                  <AntDesign name='hearto' size={32} color={colors.blue} />
                )}
              </TouchableOpacity>
            </PostHeader>
            <Text medium>Price: {item.price}</Text>
            <Text medium>Type of Medicine: {item.type}</Text>
            <Text medium>Purchased at: {item.location}</Text>
            <Text medium>THC Amount: {item.thc}</Text>
            <Text medium>CBD Amount: {item.cbd}</Text>
          </PostContent>
        </PostContainer>
      ) : (
        <></>
      )}
    </Swipeable>
  );

  return (
    <Container>
      <StatusBar style='light' />
      <BudContainer>
        <Text title center style={{ color: 'whitesmoke' }}>
          Favorite Buds
        </Text>
        <Buds
          data={buds}
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
  padding-top: 64px;
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

const PostHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
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
  left: 30px;
  margin-left: 30px;
`;
