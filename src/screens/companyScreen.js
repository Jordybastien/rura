import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
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
            <Text style={styles.headerLabel}>Company Invoice</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <ImageBackground
            source={require('../../assets/bg-3.png')}
            style={styles.bgContent}
          >
            <View style={styles.txtBoxContainer}>
              <View style={styles.txtBoxContWrapper}>
                <View style={styles.txtBoxCont}>
                  <View style={styles.txtLabelCont}>
                    <Text style={styles.txtLabel}>Email</Text>
                  </View>
                  <View style={styles.txtBoxHolder}>
                    <TextInput
                      style={styles.txtBoxInput}
                      placeholder="test@test.com"
                    />
                  </View>
                </View>
              </View>
              {/* Another box here */}
            </View>
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
  },
  bgContent: {
    height: height - 120,
    backgroundColor: white,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
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
  txtBoxContainer: {
    flex: 1,
    width: width,
    width: width - 80,
  },
  txtBoxContWrapper: {
    backgroundColor: orange,
    paddingRight: 10,
    borderRadius: 5,
    height: 60,
    marginBottom: 20,
  },
  txtBoxCont: {
    backgroundColor: white,
    borderRadius: 5,
    height: 60,
    padding: 10,
    borderColor: orange,
    borderWidth: 1,
  },
  txtLabelCont: { marginBottom: 5 },
  txtLabel: {
    color: gray,
    fontFamily: 'regular',
  },
});
