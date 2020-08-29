import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Spinner } from 'native-base';
import { blue, white, gray, orange } from '../utils/colors';
import Svg, { Path } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { handleUserLogin } from '../actions/authedUser';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    showSvg: true,
    loading: false,
    errors: {
      email: '',
      password: '',
    },
  };

  handleLogin = () => {
    const { response, data } = this.validateData();
    if (response) {
      this.setState({ loading: true });
      this.props.dispatch(handleUserLogin(data)).then((res) => {
        this.setState({ loading: false });
        if (res.type !== 'LOG_ERROR') {
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          });
        } else
          Toast.show({
            text1: 'Warning',
            text2: res.error,
            type: 'error',
          });
      });
    }
  };

  validateData = () => {
    const { password, email } = this.state;

    let response = true;
    let errorMessage = '';

    if (!password) {
      response = false;
      errorMessage = 'Password is required';
    }

    if (!email) {
      response = false;
      errorMessage = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      response = false;
      errorMessage = 'Email is invalid';
    }

    let data = {};

    data.email = email;
    data.password = password;

    errorMessage &&
      Toast.show({
        text1: 'Warning',
        text2: errorMessage,
        type: 'error',
      });
    return { response, data };
  };

  render() {
    const { email, showSvg, password, loading } = this.state;

    return (
      <Animatable.View animation="fadeInUp">
        <ImageBackground
          source={require('../../assets/bg-3.png')}
          style={{ width, height }}
        >
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.imgContainer}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.loginContainerHidden}>
              <View style={styles.headerTextContainer}>
                <View>
                  <Text style={styles.welcome}>Welcome</Text>
                </View>
                <View>
                  <Text style={styles.paragraphText}>
                    Login into your account.
                  </Text>
                </View>
              </View>
              <View style={styles.txtBoxContainer}>
                <TouchableOpacity
                  style={styles.txtBoxContWrapper}
                  onPress={() => {
                    this.emailTxt.focus();
                  }}
                  activeOpacity={1}
                >
                  <View style={styles.txtBoxCont}>
                    <View style={styles.txtLabelCont}>
                      <Text style={styles.txtLabel}>Email</Text>
                    </View>
                    <View style={styles.txtBoxHolder}>
                      <TextInput
                        style={styles.txtBoxInput}
                        onChangeText={(email) => this.setState({ email })}
                        value={email}
                        placeholder="test@test.com"
                        onFocus={() => this.setState({ showSvg: false })}
                        onBlur={() => this.setState({ showSvg: true })}
                        autoCapitalize="none"
                        ref={(input) => {
                          this.emailTxt = input;
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.txtBoxContWrapper}
                  onPress={() => {
                    this.passwordTxt.focus();
                  }}
                  activeOpacity={1}
                >
                  <View style={styles.txtBoxCont}>
                    <View style={styles.txtLabelCont}>
                      <Text style={styles.txtLabel}>Password</Text>
                    </View>
                    <View style={styles.txtBoxHolder}>
                      <TextInput
                        style={styles.txtBoxInput}
                        onChangeText={(password) => this.setState({ password })}
                        value={password}
                        onFocus={() => this.setState({ showSvg: false })}
                        onBlur={() => this.setState({ showSvg: true })}
                        secureTextEntry={true}
                        placeholder="********"
                        autoCapitalize="none"
                        ref={(input) => {
                          this.passwordTxt = input;
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.buttonHolder}
                  onPress={this.handleLogin}
                >
                  <View style={styles.buttonIconHolder}>
                    {loading ? (
                      <AntDesign name="unlock" size={30} color={blue} />
                    ) : (
                      <AntDesign name="lock1" size={30} color={blue} />
                    )}
                  </View>
                  <View style={styles.buttonContainer}>
                    {loading ? (
                      <Spinner color={blue} />
                    ) : (
                      <AntDesign name="arrowright" size={30} color={blue} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </Animatable.View>
    );
  }
}

export default connect()(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  svgContainer: { flex: 1, width: width },
  loginContainer: {
    flex: 4,
    backgroundColor: blue,
    width: width,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginContainerHidden: {
    height: height - 150,
    backgroundColor: blue,
    width: width,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: width,
    padding: 10,
  },
  logoContainerHidden: {
    flex: 1,
    alignItems: 'center',
    width: width,
    padding: 10,
  },
  logo: {
    width: width / 2,
    height: height / 8,
    resizeMode: 'contain',
  },
  ilImgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    padding: 10,
  },
  ilImg: {
    marginTop: 80,
    width: width,
    resizeMode: 'contain',
  },
  svgImg: {
    marginTop: 15,
  },
  headerTextContainer: {
    flex: 1,
    width: width,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBoxContainer: {
    flex: 1,
    width: width - 100,
  },
  txtBoxCont: {
    backgroundColor: white,
    borderRadius: 5,
    height: 60,
    padding: 10,
  },
  txtBoxContWrapper: {
    backgroundColor: orange,
    paddingRight: 10,
    borderRadius: 5,
    height: 60,
    marginBottom: 20,
  },
  txtLabel: {
    color: gray,
    fontFamily: 'regular',
  },
  welcome: {
    color: white,
    fontFamily: 'bold',
    fontSize: 20,
  },
  paragraphText: {
    color: white,
    fontFamily: 'regular',
    fontSize: 16,
  },
  txtLabelCont: { marginBottom: 5 },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHolder: {
    backgroundColor: white,
    width: 150,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    flexDirection: 'row',
  },
  buttonIconHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: orange,
    borderRadius: 30,
  },
});
