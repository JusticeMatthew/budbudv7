import React, { useContext, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components';
import {
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  Button,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { UserContext } from '../context/UserContext';

import colors from '../design/colors';
import slides from '../design/onboardingSlides';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';

export default Onboarding = () => {
  const [user, setUser] = useContext(UserContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleExit = () => {
    setUser({ ...user, firstLogin: false });
  };

  return (
    <Container>
      <TouchableOpacity
        onPress={handleExit}
        style={{ alignSelf: 'flex-end', top: 64, right: 24, zIndex: 1 }}
      >
        <AntDesign
          name='closecircle'
          size={32}
          style={{
            color: colors.green,
          }}
        />
      </TouchableOpacity>
      <View style={{ flex: 3 }}>
        <StatusBar style='light' />
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.blue};
  justify-content: center;
  align-items: center;
`;
