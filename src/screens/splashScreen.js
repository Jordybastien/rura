import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Spinner } from 'native-base';
import { useFonts } from '@use-expo/font';
import { white, blue } from '../utils/colors';

const { width, height } = Dimensions.get('window');

const SplashScreen = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [isFontLoaded] = useFonts({
    regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
    bold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    semiBold: require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    italic: require('../../assets/fonts/Montserrat-Italic.ttf'),
  });

  setTimeout(() => {
    setShowSpinner(true);
  }, 3000);

  setTimeout(() => {
    props.navigation.navigate('LoginScreen');
  }, 8000);

  return (
    <View>
      <ImageBackground
        source={require('../../assets/bg-3.png')}
        style={{ width, height }}
      >
        <View style={styles.container}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />

          {showSpinner && <Spinner color={blue} />}
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 100,
    width: width - 100,
    height: height / 4,
    resizeMode: 'contain',
  },
  bottomLogo: {
    marginBottom: 50,
  },
  text: {
    color: white,
    fontWeight: 'bold',
    textAlign: 'center',
    color: blue,
    marginBottom: 100,
  },
});
