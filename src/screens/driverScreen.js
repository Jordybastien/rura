import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { blue, white, gray, orange } from '../utils/colors';
import { LinearGradient } from 'expo-linear-gradient';
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

class DriverScreen extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerLabel}>Driver</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <ImageBackground
            source={require('../../assets/bg-3.png')}
            style={styles.mainContent}
          >
            <View>
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => this.props.navigation.navigate('ScanScreen')}
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.2)', 'transparent']}
                  style={styles.gradient}
                />
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name="barcode-scan"
                    size={50}
                    color={white}
                  />
                </View>
                <Text style={styles.iconLabel}>Scan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardContainer, { backgroundColor: blue }]}
                onPress={() =>
                  this.props.navigation.navigate('ScanDetailsScreen', {
                    isScan: false,
                  })
                }
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.2)', 'transparent']}
                  style={styles.gradient}
                />
                <View style={styles.iconContainer}>
                  <FontAwesome
                    name="pencil-square-o"
                    size={50}
                    color={white}
                  />
                </View>
                <Text style={[styles.iconLabel, { color: white }]}>Fill</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 100,
    paddingBottom: 100,
  },
  headerLabel: {
    color: white,
    fontFamily: 'bold',
    fontSize: 18,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  gradient: {
    borderRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 120,
  },
  iconLabel: {
    color: white,
    fontFamily: 'bold',
    fontSize: 20,
  },
});
