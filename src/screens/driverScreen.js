import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { blue, white, gray, orange } from '../utils/colors';

const { width, height } = Dimensions.get('window');

class DriverScreen extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerLabel}>Driver Details</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ScanScreen')}
          >
            <Text>DriverScreen</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default DriverScreen;

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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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
