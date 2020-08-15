import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { blue, white, gray, orange } from '../utils/colors';

const { width, height } = Dimensions.get('window');

class CompanyScreen extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerLabel}>Company Details</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <ImageBackground
            source={require('../../assets/bg-3.png')}
            style={styles.mainContent}
          >
            <Text>CompanyScreen</Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default CompanyScreen;

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
    height: height - 120,
    backgroundColor: white,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 100,
    paddingBottom: 100,
  },
  headerLabel: {
    color: orange,
    fontFamily: 'bold',
    fontSize: 18,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
