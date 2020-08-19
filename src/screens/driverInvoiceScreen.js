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
  Image,
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

class DriverInvoiceScreen extends Component {
  state = {
    selIdNumber: '',
    loading: false,
    showError: false,
  };

  render() {
    const { selIdNumber, loading, showError } = this.state;
    const { driver } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <View>
              <Text style={styles.headerLabel}>
                {driver.driver_first_name} {driver.driver_last_name}
              </Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>{driver.company_name}</Text>
            </View>
          </View>
          <View style={styles.headerImg}>
            <Image
              source={{
                uri: `http://46.101.182.152:9003/Drivers/${driver.driver_photo_name}`,
              }}
              style={styles.userImage}
            />
          </View>
        </View>
        <View style={styles.mainContent}>
          <ImageBackground
            source={require('../../assets/bg-3.png')}
            style={[styles.mainContent, { paddingTop: 20 }]}
          >
            <View style={styles.invoicesContainer}>
              <View style={styles.invoiceCard}>
                <Text>Invoice</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ driver }) => {
  return {
    driver,
  };
};

export default connect(mapStateToProps)(DriverInvoiceScreen);

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
  },
  headerLabel: {
    color: white,
    fontFamily: 'bold',
    fontSize: 18,
  },
  mainContent: {
    height: height - 150,
    backgroundColor: white,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  headerTitle: {
    color: orange,
    fontFamily: 'regular',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: orange,
    borderWidth: 2,
  },
  invoicesContainer: {
    flex: 1,
  },
  invoiceCard: {
    borderBottomColor: blue,
    borderBottomWidth: 7,
    width: width - 80,
    height: 130,
    backgroundColor: white,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
