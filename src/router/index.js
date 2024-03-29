import React, { useEffect, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { blue } from '../utils/colors';
import Constants from 'expo-constants';
import { StatusBar, View } from 'react-native';
import MainNav from './stackNavigator';
import { handleInitialData, handleDriverData } from '../actions/initialData';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import { checkToken } from '../services/auth';
import { setAuthedUser } from '../actions/authedUser';
import { deleteToken } from '../utils/storage';
import NetInfo from '@react-native-community/netinfo';

class Router extends Component {
  componentDidMount() {
    NetInfo.fetch().then((state) => {
      const connectionStatus = state?.isConnected ?? false;
      // TODO: Switch back to connectionStatus instead of true
      // TODO: send connectionStatus as parameter
      this.props.dispatch(handleInitialData());
    });
    refreshUser(this.props).then((user) => {
      if (user) {
        this.props.dispatch(handleDriverData(user.id));
      }
    });
  }

  render() {
    refreshUser(this.props);
    return (
      <NavigationContainer>
        <AppStatusBar backgroundColor={blue} barStyle="light-content" />
        <MainNav />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    );
  }
}

const AppStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default connect()(Router);

export const refreshUser = async (props) => {
  const { token, user } = await checkToken();

  if (token && user) {
    const currentTime = Date.now() / 1000;
    if (token.exp < currentTime) {
      await deleteToken();
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }

    props.dispatch(setAuthedUser(user));
    return user;
  }
};
