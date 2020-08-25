import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import { blue, white, gray, orange, lowGray } from '../utils/colors';
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Foundation,
} from '@expo/vector-icons';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

class HomeScreen extends Component {
  state = {};

  render() {
    const { authedUser } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerLabel}>Profile</Text>
          </View>
          <View style={styles.headerImg}>
            <FontAwesome name="user-circle-o" size={120} color={white} />
          </View>
        </View>
        <View style={styles.mainContent}>
          <ImageBackground
            source={require('../../assets/bg-3.png')}
            style={styles.mainContent}
          >
            <View style={styles.menuContainer}>
              <View style={styles.menuContent}>
                <View style={styles.menuLabelContainer}>
                  <Text style={styles.menuLabel}>Name</Text>
                </View>
                <View style={styles.menuLabelContainer}>
                  <Text style={styles.menuValue}>{authedUser.name}</Text>
                </View>
              </View>
              <View style={styles.menuContent}>
                <View style={styles.menuLabelContainer}>
                  <Text style={styles.menuLabel}>Email</Text>
                </View>
                <View style={styles.menuLabelContainer}>
                  <Text style={styles.menuValue}>{authedUser.email}</Text>
                </View>
              </View>
              <View style={[styles.menuContent, { borderBottomWidth: 0 }]}>
                <View style={styles.menuLabelContainer}>
                  <Text style={styles.menuLabel}>Phone</Text>
                </View>
                <View style={styles.menuLabelContainer}>
                  <Text style={styles.menuValue}>
                    {authedUser.phone_number
                      ? authedUser.phone_number
                      : 'Not Recorded'}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blue,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 50,
  },
  mainContent: {
    height: height - 270,
    backgroundColor: white,
    width: width,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // paddingTop: 100,
    paddingBottom: 100,
  },
  headerLabel: {
    color: white,
    fontFamily: 'bold',
    fontSize: 20,
  },
  headerTitle: {
    color: orange,
    fontFamily: 'regular',
  },
  cardContainer: {
    width: width - 120,
    height: 120,
    backgroundColor: orange,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 20,
  },
  iconLabel: {
    color: white,
    fontFamily: 'bold',
    fontSize: 20,
  },
  gradient: {
    borderRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 120,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: orange,
    borderWidth: 2,
  },
  headerText: {
    marginBottom: 20,
  },
  headerImg: {
    borderColor: white,
    borderWidth: 3,
    borderRadius: 64,
    padding: 2,
  },
  menuContainer: {
    width: width,
    height: height / 2.5,
    backgroundColor: white,
    paddingTop: 20,
    paddingBottom: 20,
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
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: lowGray,
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
  },
  menuIconContainer: {
    flex: 1,
  },
  menuLabelContainer: {
    flex: 1,
  },
  menuLabel: {
    fontFamily: 'regular',
    color: gray,
    fontSize: 13,
  },
  menuValue: {
    fontFamily: 'bold',
    color: blue,
    fontSize: 13,
  },
});
