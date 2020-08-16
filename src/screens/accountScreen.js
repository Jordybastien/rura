import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { logoutUser } from '../actions/authedUser';
import { deleteToken } from '../utils/storage';
import { connect } from 'react-redux';

class AccountScreen extends Component {
  state = {};

  handleLogout = () => {
    deleteToken().then(() => {
      this.props.dispatch(logoutUser());
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleLogout}>
          <Text>Click to logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(AccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
