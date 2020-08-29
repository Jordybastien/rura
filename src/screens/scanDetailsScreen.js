import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  blue,
  white,
  gray,
  orange,
  red,
  green,
  lowGray,
  rose,
  lowRose,
  anotherRed,
} from '../utils/colors';
import { AntDesign, Octicons, Ionicons, FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { Spinner } from 'native-base';
import { handleSearchDriver } from '../actions/driver';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

class ScanDetailsScreen extends Component {
  state = {
    selIdNumber: '',
    loading: false,
    showError: false,
  };

  handleSearchDriver = () => {
    this.setState({ showError: false, loading: true });
    let toSend;
    let response = true;
    let errorMessage = '';

    const { isScan, idNumber } = this.props.route.params;
    const { selIdNumber } = this.state;
    if (isScan) {
      toSend = idNumber;
    } else {
      if (!selIdNumber) {
        response = false;
        errorMessage = 'ID Number is required';
      } else if (selIdNumber.length < 16 || selIdNumber.length > 16) {
        response = false;
        errorMessage = 'ID Number can not be less than 16';
      } else {
        toSend = selIdNumber;
      }
    }

    if (response) {
      this.props
        .dispatch(handleSearchDriver({ driving_license: toSend }))
        .then((res) => {
          this.setState({ loading: false, showError: false });
          if (res.type === 'SEARCH_DRIVER') {
            this.props.navigation.navigate('DriverDetailsScreen');
          } else {
            Toast.show({
              text1: 'Warning',
              text2: res.error,
              type: 'error',
            });
            this.setState({ showError: true });
          }
        });
    } else {
      this.setState({ loading: false });
      Toast.show({
        text1: 'Warning',
        text2: errorMessage,
        type: 'error',
      });
    }
  };
  render() {
    const { isScan, idNumber } = this.props.route.params;

    const { selIdNumber, loading, showError } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.container}>
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.headerLabel}>Driver Details</Text>
            </View>
          </View>
          <View style={styles.mainContent}>
            <ImageBackground
              source={require('../../assets/bg-3.png')}
              style={styles.mainContent}
            >
              <View style={styles.txtBoxContainer}>
                <TouchableOpacity
                  style={styles.txtBoxContWrapper}
                  onPress={() => {
                    this.idNumTxt.focus();
                  }}
                  activeOpacity={1}
                >
                  <View style={styles.txtBoxCont}>
                    <View style={styles.txtLabelCont}>
                      <Text style={styles.txtLabel}>ID Number</Text>
                    </View>
                    <View style={styles.txtBoxHolder}>
                      <TextInput
                        style={styles.txtBoxInput}
                        value={idNumber}
                        editable={!isScan}
                        maxLength={16}
                        placeholder="0000000000000000"
                        onChangeText={(selIdNumber) =>
                          this.setState({ selIdNumber })
                        }
                        ref={(input) => {
                          this.idNumTxt = input;
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                {showError && (
                  <View style={styles.errorContainer}>
                    <View style={styles.errorIconContainer}>
                      <FontAwesome
                        name="times-circle-o"
                        size={30}
                        color={anotherRed}
                      />
                    </View>
                    <View style={styles.errorTextContainer}>
                      <View>
                        <Text style={styles.errorTitle}>Error</Text>
                      </View>
                      <View>
                        <Text style={styles.errorLabel}>Driver not found</Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={[styles.buttonHolder, !isScan && styles.notScanBtn]}
                  onPress={this.handleSearchDriver}
                >
                  <View
                    style={[styles.buttonContainer, { backgroundColor: green }]}
                  >
                    {loading ? (
                      <Spinner color={white} />
                    ) : (
                      <View>
                        <Octicons name="thumbsup" size={30} color={white} />
                        <Text style={styles.btnLabel}>Verify</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                {isScan && (
                  <TouchableOpacity
                    style={styles.buttonHolder}
                    onPress={() =>
                      this.props.navigation.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'DriverScreen',
                          },
                        ],
                      })
                    }
                  >
                    <View
                      style={[styles.buttonContainer, { backgroundColor: red }]}
                    >
                      <Ionicons name="md-refresh" size={30} color={white} />
                      <Text style={styles.btnLabel}>Retake</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </ImageBackground>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(ScanDetailsScreen);

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
  headerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLabel: {
    color: white,
    fontFamily: 'bold',
    fontSize: 18,
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
  txtBoxContainer: {
    flex: 1,
    width: width - 100,
  },
  txtBoxCont: {
    backgroundColor: white,
    borderRadius: 5,
    height: 60,
    padding: 10,
    borderColor: orange,
    borderWidth: 1,
  },
  txtBoxContWrapper: {
    backgroundColor: orange,
    paddingRight: 10,
    borderRadius: 5,
    height: 60,
    marginBottom: 20,
  },
  txtLabelCont: { marginBottom: 5 },
  txtLabel: {
    color: gray,
    fontFamily: 'regular',
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: width - 100,
  },
  buttonHolder: {
    backgroundColor: white,
    width: 120,
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
  },
  buttonIconHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blue,
    borderRadius: 20,
  },
  btnLabel: {
    fontFamily: 'bold',
    color: blue,
    color: white,
  },
  notScanBtn: {
    width: width - 100,
  },
  errorContainer: {
    backgroundColor: lowRose,
    borderColor: rose,
    borderWidth: 1,
    flex: 1,
    // justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  errorIconContainer: {
    flex: 1,
  },
  errorTextContainer: {
    flex: 3,
  },
  errorTitle: {
    fontFamily: 'bold',
    color: blue,
    fontSize: 18,
  },
  errorLabel: {
    fontFamily: 'regular',
    color: blue,
  },
});
