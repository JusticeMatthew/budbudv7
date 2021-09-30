import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

export default AuthStackScreens = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name='Login' component={LoginScreen} />
      <AuthStack.Screen name='Signup' component={SignupScreen} />
    </AuthStack.Navigator>
  );
};
