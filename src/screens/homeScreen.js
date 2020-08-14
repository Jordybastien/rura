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
import { blue, white, gray, orange } from '../utils/colors';
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

class HomeScreen extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <View>
              <Text style={styles.headerLabel}>User Name</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>Officer</Text>
            </View>
          </View>
          <View style={styles.headerImg}>
            <FontAwesome name="user-circle-o" size={40} color={white} />
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
                onPress={() => this.props.navigation.navigate('DriverScreen')}
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.2)', 'transparent']}
                  style={styles.gradient}
                />
                <View style={styles.iconContainer}>
                  <AntDesign name="car" size={50} color={blue} />
                </View>
                <Text style={styles.iconLabel}>Driver</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardContainer, { backgroundColor: blue }]}
                onPress={() => this.props.navigation.navigate('CompanyScreen')}
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.2)', 'transparent']}
                  style={styles.gradient}
                />
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name="office-building"
                    size={50}
                    color={orange}
                  />
                </View>
                <Text style={[styles.iconLabel, { color: orange }]}>
                  Company
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default HomeScreen;

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
    height: height - 200,
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
    color: blue,
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
});
