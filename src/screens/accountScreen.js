import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import { logoutUser } from '../actions/authedUser';
import { deleteToken } from '../utils/storage';
import { connect } from 'react-redux';
import { blue, white, gray, orange, lowGray, lowBlue } from '../utils/colors';
import { FontAwesome, SimpleLineIcons, Foundation } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

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
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerLabel}>Account</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <ImageBackground
            source={require('../../assets/bg-3.png')}
            style={[styles.mainContent, { paddingTop: 0 }]}
          >
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuContent}
                onPress={() => this.props.navigation.navigate('ProfileScreen')}
              >
                <View style={styles.menuIconContainer}>
                  <FontAwesome name="user-circle-o" size={30} color={blue} />
                </View>
                <View style={styles.menuLabelContainer}>
                  <Text style={styles.menuLabel}>Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuContent}>
                <View style={styles.menuIconContainer}>
                  <Foundation name="clipboard-notes" size={30} color={blue} />
                </View>
                <View style={styles.menuLabelContainer}>
                  <Text style={styles.menuLabel}>About Us</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.menuContent, { borderBottomWidth: 0 }]}
                onPress={this.handleLogout}
              >
                <View style={styles.menuIconContainer}>
                  <SimpleLineIcons name="logout" size={30} color={blue} />
                </View>
                <View style={styles.menuLabelContainer}>
                  <Text style={styles.menuLabel}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
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
    backgroundColor: blue,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 50,
  },
  mainContent: {
    height: Platform.OS === 'ios' ? height - 150 : height - 180,
    backgroundColor: white,
    width: width,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // paddingTop: 30,
    paddingBottom: 100,
  },
  headerLabel: {
    color: white,
    fontFamily: 'bold',
    fontSize: 22,
  },
  headerTitle: {
    color: orange,
    fontFamily: 'regular',
  },
  menuContainer: {
    width: width,
    height: height / 2.5,
    backgroundColor: white,
    paddingTop: 20,
    paddingBottom: 20,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  menuContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: lowGray,
    borderBottomWidth: 1,
  },
  menuIconContainer: {
    flex: 1,
  },
  menuLabelContainer: {
    flex: 6,
  },
  menuLabel: {
    fontFamily: 'regular',
    color: gray,
    fontSize: 20,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
