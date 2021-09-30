import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import colors from '../design/colors';

import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import PostScreen from '../screens/PostScreen';
import FilterScreen from '../screens/FilterScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default MainStackScreens = () => {
  const MainStack = createBottomTabNavigator();

  const screenOptions = ({ route }) => ({
    tabBarShowLabel: false,
    tabBarIcon: ({ focused }) => {
      let iconName = 'home';

      switch (route.name) {
        case 'Home':
          iconName = 'home';
          break;
        case 'Favorite':
          iconName = 'heart';
          break;
        case 'Filter':
          iconName = 'filter';
          break;
        case 'Profile':
          iconName = 'user';
          break;

        default:
          iconName = 'home';
      }

      if (route.name === 'Post') {
        return <AntDesign name='pluscircle' size={42} color={colors.green} />;
      }
      return (
        <FontAwesome
          name={iconName}
          size={30}
          color={focused ? '#1f2833' : '#cacaca'}
        />
      );
    },
  });

  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen name='Home' component={HomeScreen} />
      <MainStack.Screen name='Favorite' component={FavoriteScreen} />
      <MainStack.Screen name='Post' component={PostScreen} />
      <MainStack.Screen name='Filter' component={FilterScreen} />
      <MainStack.Screen name='Profile' component={ProfileScreen} />
    </MainStack.Navigator>
  );
};
