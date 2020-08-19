import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreen';
import LoginScreen from '../screens/loginScreen';
import { blue, white } from '../utils/colors';
import TabNavigator from './tabNavigator';
import LogoTitle from '../components/logoTitle';
import CompanyScreen from '../screens/companyScreen';
import DriverScreen from '../screens/driverScreen';
import ScanScreen from '../screens/cameraScreen';
import ScanDetailsScreen from '../screens/scanDetailsScreen';
import DriverDetailsScreen from '../screens/driverDetailsScreen';
import SuccessScreen from '../screens/successScreen';
import DriverTicketScreen from '../screens/driverTicketScreen';
import DriverInvoiceScreen from '../screens/driverInvoiceScreen';

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
  CompanyScreen: {
    name: 'CompanyScreen',
    component: CompanyScreen,
    options: {
      headerShown: true,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTintColor: white,
    },
  },
  DriverScreen: {
    name: 'DriverScreen',
    component: DriverScreen,
    options: {
      headerShown: true,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTintColor: white,
    },
  },
  ScanScreen: {
    name: 'ScanScreen',
    component: ScanScreen,
    options: {
      headerShown: true,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTintColor: white,
    },
  },
  ScanDetailsScreen: {
    name: 'ScanDetailsScreen',
    component: ScanDetailsScreen,
    options: {
      headerShown: true,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTintColor: white,
      headerLeft: null,
    },
  },
  DriverDetailsScreen: {
    name: 'DriverDetailsScreen',
    component: DriverDetailsScreen,
    options: {
      headerShown: false,
    },
  },
  SuccessScreen: {
    name: 'SuccessScreen',
    component: SuccessScreen,
    options: { headerShown: false },
  },
  DriverTicketScreen: {
    name: 'DriverTicketScreen',
    component: DriverTicketScreen,
    options: {
      headerShown: true,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTintColor: white,
    },
  },
  DriverInvoiceScreen: {
    name: 'DriverInvoiceScreen',
    component: DriverInvoiceScreen,
    options: {
      headerShown: true,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTintColor: white,
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
          headerTitle: () => <LogoTitle isHome={true} />,
          headerStyle: {
            backgroundColor: blue,
            shadowColor: 'transparent',
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        {...StackConfig['CompanyScreen']}
        options={{
          headerTitle: () => <LogoTitle isHome={false} />,
          headerStyle: {
            backgroundColor: blue,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: white,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        {...StackConfig['DriverScreen']}
        options={{
          headerTitle: () => <LogoTitle isHome={false} />,
          headerStyle: {
            backgroundColor: blue,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: white,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        {...StackConfig['ScanScreen']}
        options={{
          headerTitle: () => <LogoTitle isHome={false} />,
          headerStyle: {
            backgroundColor: blue,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: white,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        {...StackConfig['ScanDetailsScreen']}
        options={{
          headerTitle: () => <LogoTitle isHome={false} />,
          headerStyle: {
            backgroundColor: blue,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: white,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen {...StackConfig['DriverDetailsScreen']} />
      <Stack.Screen {...StackConfig['SuccessScreen']} />
      <Stack.Screen
        {...StackConfig['DriverTicketScreen']}
        options={{
          headerTitle: () => <LogoTitle isHome={false} />,
          headerStyle: {
            backgroundColor: blue,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: white,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        {...StackConfig['DriverInvoiceScreen']}
        options={{
          headerTitle: () => <LogoTitle isHome={false} />,
          headerStyle: {
            backgroundColor: blue,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: white,
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
