import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../design/colors';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>BudBud</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 128,
    alignSelf: 'center',
  },

  header: {
    alignSelf: 'center',
    fontSize: 64,
    color: colors.green,
    marginTop: 64,
  },
});
