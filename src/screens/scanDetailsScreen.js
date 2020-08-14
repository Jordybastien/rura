import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  TextInput,
} from 'react-native';
import {
  blue,
  white,
  gray,
  orange,
  red,
  green,
  lowGray,
} from '../utils/colors';
import { AntDesign, Octicons, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

class ScanDetailsScreen extends Component {
  state = {};

  handleSearchDriver = () => {
    //   TODO: Handle search driver
    this.props.navigation.navigate('DriverDetailsScreen');
  };
  render() {
    return (
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
              <View style={styles.txtBoxContWrapper}>
                <View style={styles.txtBoxCont}>
                  <View style={styles.txtLabelCont}>
                    <Text style={styles.txtLabel}>ID Number</Text>
                  </View>
                  <View style={styles.txtBoxHolder}>
                    <TextInput
                      style={styles.txtBoxInput}
                      value={this.props.route.idNumber}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.buttonHolder}
                onPress={this.handleSearchDriver}
              >
                {/* <View
                  style={[styles.buttonContainer, { backgroundColor: green }]}
                >
                  <Octicons name="thumbsup" size={30} color={white} />
                </View> */}
                <View
                  style={[styles.buttonContainer, { backgroundColor: green }]}
                >
                  <Octicons name="thumbsup" size={30} color={white} />
                  <Text style={styles.btnLabel}>Verify</Text>
                </View>
              </TouchableOpacity>
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
                {/* <View
                  style={[styles.buttonContainer, { backgroundColor: red }]}
                >
                  <Octicons name="thumbsdown" size={30} color={white} />
                </View> */}
                <View
                  style={[styles.buttonContainer, { backgroundColor: red }]}
                >
                  <Ionicons name="md-refresh" size={30} color={white} />
                  <Text style={styles.btnLabel}>Retake</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default ScanDetailsScreen;

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
    color: orange,
    fontFamily: 'bold',
    fontSize: 18,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blue,
    borderRadius: 30,
  },
  btnLabel: {
    fontFamily: 'bold',
    color: blue,
    color: white,
  },
});
