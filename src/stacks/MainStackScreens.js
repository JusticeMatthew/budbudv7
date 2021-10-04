import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import colors from '../design/colors';

import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import FilterScreen from '../screens/FilterScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default MainStackScreens = () => {
  const MainStack = createBottomTabNavigator();

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarIcon: ({ focused }) => {
      let iconName = 'home';

      switch (route.name) {
        case 'Home':
          iconName = 'home';
          break;
        case 'Favorites':
          iconName = 'heart';
          break;
        case 'Search':
          iconName = 'search';
          break;
        case 'Profile':
          iconName = 'user';
          break;

        default:
          iconName = 'home';
      }

      if (route.name === 'Add') {
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

  const PostTab = () => <></>;

  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen name='Home' component={HomeScreen} />
      <MainStack.Screen name='Favorites' component={FavoriteScreen} />
      <MainStack.Screen
        name='Add'
        component={PostTab}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('AddModal');
          },
        })}
      />
      <MainStack.Screen name='Search' component={FilterScreen} />
      <MainStack.Screen name='Profile' component={ProfileScreen} />
    </MainStack.Navigator>
  );
};
