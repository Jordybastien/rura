import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreen';
import LoginScreen from '../screens/loginScreen';
import { blue, white } from '../utils/colors';
import TabNavigator from './tabNavigator';
import LogoTitle from '../components/logoTitle';

const StackNavigatorConfig = {
  headerMode: 'screen',
};

const StackConfig = {
  SplashScreen: {
    name: 'SplashScreen',
    component: SplashScreen,
    options: { headerShown: false },
  },
  LoginScreen: {
    name: 'LoginScreen',
    component: LoginScreen,
    options: { headerShown: false },
  },
  HomeScreen: {
    name: 'HomeScreen',
    component: TabNavigator,
    options: {
      headerShown: true,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTintColor: white,
      title: 'DVCMS',
      headerLeft: null,
    },
  },
};
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator {...StackNavigatorConfig}>
      <Stack.Screen {...StackConfig['SplashScreen']} />
      <Stack.Screen {...StackConfig['LoginScreen']} />
      <Stack.Screen
        {...StackConfig['HomeScreen']}
        options={{
          headerTitle: () => <LogoTitle />,
          headerStyle: {
            backgroundColor: blue,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
