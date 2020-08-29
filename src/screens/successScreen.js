import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { blue, white, gray, orange } from '../utils/colors';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const SuccessScreen = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/bg-3.png')}
        style={styles.container}
      >
        <View style={styles.mainContainer}>
          <Animatable.View animation="bounceIn">
            <Ionicons
              name="ios-checkmark-circle-outline"
              size={width / 1.5}
              color={orange}
            />
          </Animatable.View>
          <View style={styles.labelContainer}>
            <Text style={styles.mainLabel}>Offence recorded successfully!</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonHolder}
            onPress={() =>
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
              })
            }
          >
            <View style={[styles.buttonContainer]}>
              <AntDesign name="home" size={30} color={white} />
              <Text style={styles.btnLabel}>Back Home</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLabel: {
    fontFamily: 'bold',
    color: white,
    textAlign: 'center',
    fontSize: 20,
  },
  labelContainer: {
    width: width - 100,
  },
  buttonHolder: {
    backgroundColor: orange,
    width: 180,
    height: 60,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    flexDirection: 'row',
    marginTop: 50,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: orange,
    borderRadius: 20,
  },
  btnLabel: {
    fontFamily: 'bold',
    color: blue,
    color: white,
  },
});
