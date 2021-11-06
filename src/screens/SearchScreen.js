import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../components/Text';
import colors from '../design/colors';

export default SearchScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Text center title style={{ color: 'whitesmoke' }}>
        Search Coming Soon!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
  },
});
