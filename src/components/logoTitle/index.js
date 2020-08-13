import React from 'react';
import { View, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { blue, white, gray, orange } from '../../utils/colors';

const { width, height } = Dimensions.get('window');

const LogoTitle = ({ isHome }) => {
  return (
    <View
      style={[
        styles.container,
        isHome
          ? Platform.OS === 'android' && styles.adjustAndroid
          : styles.adjustBackButton,
      ]}
    >
      <Image
        source={require('../../../assets/white-logo-2.png')}
        style={styles.imgSize}
      />
    </View>
  );
};

export default LogoTitle;

const styles = StyleSheet.create({
  container: {
    backgroundColor: blue,
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adjustAndroid: {
    width: width - 50,
  },
  adjustBackButton: {
    width: width - 150,
  },
  imgSize: {
    width: width / 5,
    height: height / 8,
    resizeMode: 'contain',
  },
});
