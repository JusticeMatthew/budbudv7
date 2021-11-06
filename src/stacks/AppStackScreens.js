import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { UserContext } from '../context/UserContext';

import AuthStackScreens from './AuthStackScreens';
import MainStackScreens from './MainStackScreens';
import LoadingScreen from '../screens/LoadingScreen';
import PostScreen from '../screens/PostScreen';
import EditScreen from '../screens/EditScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

export default AppStackScreens = () => {
  const AppStack = createStackNavigator();
  const [user] = useContext(UserContext);

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {user.firstLogin === true ? (
        <AppStack.Screen name='Onboarding' component={OnboardingScreen} />
      ) : user.isLoggedIn === null ? (
        <AppStack.Screen name='Loading' component={LoadingScreen} />
      ) : user.isLoggedIn ? (
        <AppStack.Screen name='Main' component={MainStackScreens} />
      ) : (
        <AppStack.Screen name='Auth' component={AuthStackScreens} />
      )}
      <AppStack.Group screenOptions={{ presentation: 'modal' }}>
        <AppStack.Screen name='AddModal' component={PostScreen} />
      </AppStack.Group>
      <AppStack.Group screenOptions={{ presentation: 'modal' }}>
        <AppStack.Screen name='EditModal' component={EditScreen} />
      </AppStack.Group>
    </AppStack.Navigator>
  );
};
