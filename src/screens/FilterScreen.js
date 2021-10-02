import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../design/colors';

export default FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 28, color: 'whitesmoke' }}>
        Filters Coming Soon!
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
