import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swipeable } from 'react-native-gesture-handler';
import { Animated, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { UserContext } from '../context/UserContext';
import { FirebaseContext } from '../context/FirebaseContext';

import Text from '../components/Text';
import colors from '../design/colors';

export default HomeScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const fireboss = useContext(FirebaseContext);
  const [buds, setBuds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('buds')
      .onSnapshot((snapshot) => {
        const budData = [];
        snapshot.forEach((doc) => {
          if (doc.data().favorite === true) {
            budData.push(doc.data());
          }
        });
        setBuds(budData);
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  const toggleFavorite = (docID) => {
    fireboss.setFavorite(docID);
  };

  const handleCompaction = () => {
    setUser({ ...user, compact: true });
  };

  const handleExpansion = () => {
    setUser({ ...user, compact: false });
  };

  // Delete button
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

  // Bud Card
  const renderBud = ({ item }) => (
    <Swipeable renderRightActions={(_, dragX) => rightActions(dragX, item.id)}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('EditModal', {
            docId: item.id,
            name: item.name,
            price: item.price,
            type: item.type,
            location: item.location,
            thc: item.thc,
            cbd: item.cbd,
            notes: item.notes,
          });
        }}
      >
        {item.favorite === true ? (
          <PostContainer>
            <PostContent>
              <PostHeader>
                <TitleContainer>
                  <Text numberOfLines={1} title>
                    {item.name}
                  </Text>
                </TitleContainer>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                  <AntDesign name="heart" size={32} color={colors.green} />
                </TouchableOpacity>
              </PostHeader>
              {user.compact ? (
                <></>
              ) : (
                <>
                  <Text medium>Purchased at: {item.location}</Text>
                  <Text medium numberOfLines={3}>
                    Notes: {item.notes}
                  </Text>
                </>
              )}
            </PostContent>
          </PostContainer>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    </Swipeable>
  );

  if (buds.length === 0 && loading) {
    return (
      <LoadingContainer>
        <StatusBar style="light" />
        <LottieView
          source={require('../../assets/spinner.json')}
          autoPlay
          loop
          style={{ width: '60%' }}
        />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <StatusBar style="light" />
      {buds.length === 0 && !loading ? (
        <HelpTextContainer>
          <Text title center style={{ color: 'whitesmoke', marginTop: 64 }}>
            You can add a{' '}
            <Text title center style={{ color: colors.green }}>
              bud
            </Text>{' '}
            to your favorites any time by tapping the heart{' '}
            <AntDesign name="hearto" size={32} color={colors.green} /> icon!
          </Text>
        </HelpTextContainer>
      ) : (
        <BudContainer>
          <Text title center style={{ color: 'whitesmoke' }}>
            Favorites
          </Text>
          {/* <ExpandIconContainer>
            <TouchableOpacity
              onPress={user.compact ? handleExpansion : handleCompaction}
            >
              <Feather
                name='menu'
                size={32}
                color={!user.compact ? 'whitesmoke' : colors.green}
              />
            </TouchableOpacity>
          </ExpandIconContainer> */}
          <Buds
            data={buds.sort((a, b) => a.name.localeCompare(b.name))}
            renderItem={renderBud}
            keyExtractor={(item) => item.id}
          />
        </BudContainer>
      )}
    </Container>
  );
};

// Styles
const Container = styled.View`
  flex: 1;
  background-color: ${colors.blue};
  padding-top: 64px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.blue};
`;

const BudContainer = styled.View`
  margin-bottom: 64px;
`;

const TitleContainer = styled.View`
  max-width: 240px;
`;

const IconContainer = styled.View``;

const HelpTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0px 32px;
`;

const ExpandIconContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0 0;
`;

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
  align-items: center;
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
  margin: 0 30px;
`;
