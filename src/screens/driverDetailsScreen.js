import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  Platform,
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
import {
  AntDesign,
  Octicons,
  FontAwesome,
  Fontisto,
  FontAwesome5,
  Entypo,
  Feather,
} from '@expo/vector-icons';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

class DriverDetails extends Component {
  state = {};

  handleTicket = () => {
    this.props.navigation.navigate('DriverTicketScreen');
  };

  render() {
    const { driver } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/bg-3.png')}
          style={styles.container}
        >
          <View style={styles.imageHolder}>
            <Image
              source={{
                uri: `http://46.101.182.152:9003/Drivers/${driver.driver_photo_name}`,
              }}
              style={styles.userImage}
            />
            <View style={styles.backBtnContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                {Platform.OS === 'android' ? (
                  <Feather name="arrow-left" size={24} color={white} />
                ) : (
                  <View style={styles.backBtn}>
                    <Entypo name="chevron-thin-left" size={24} color={white} />
                    <View>
                      <Text style={styles.backLabel}>Back</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mainInfoHolder}>
            <View style={styles.userInfoHolder}>
              <View style={styles.infoHeader}>
                <View style={{ marginBottom: 5 }}>
                  <Text style={styles.userNameLabel}>
                    {driver.driver_first_name} {driver.driver_last_name}
                  </Text>
                </View>
                <View style={{ marginBottom: 5 }}>
                  <Text style={styles.userCompany}>
                    ({driver.company_name})
                  </Text>
                </View>
                <View>
                  <Text style={styles.userNID}>NID: {driver.driver_nid}</Text>
                </View>
              </View>
              <View style={styles.infoFooter}>
                <View style={styles.footerSide}>
                  <View style={styles.footerSideHeader}>
                    <View style={styles.footerIcon}>
                      <FontAwesome
                        name="drivers-license-o"
                        size={24}
                        color={orange}
                      />
                    </View>
                    <Text style={styles.iconLabel}>License Details</Text>
                    <View style={styles.licenseContainer}>
                      <Text style={styles.licenseLabel}>
                        Categories: {driver.driver_category}
                      </Text>
                      <Text style={styles.licenseLabel}>
                        NO: {driver.driver_license}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.footerSideFooter}></View>
                </View>
                <View style={styles.footerSide}>
                  <View style={styles.footerSideHeader}>
                    <View style={styles.footerIcon}>
                      <Fontisto name="date" size={24} color={orange} />
                    </View>
                    <Text style={styles.iconLabel}>DOB</Text>
                    <View style={styles.licenseContainer}>
                      <Text style={styles.licenseLabel}>
                        {driver.driver_dob}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.footerSideFooter}></View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.btn} onPress={this.handleTicket}>
              <FontAwesome name="ticket" size={30} color={blue} />
              <Text style={styles.btnLabel}>Ticket</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <FontAwesome5 name="file-invoice" size={30} color={blue} />
              <Text style={styles.btnLabel}>Invoice</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = ({ driver }) => {
  return {
    driver,
  };
};

export default connect(mapStateToProps)(DriverDetails);

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageHolder: { flex: 1, width: width, height: height / 2 },
  userImage: {
    width: width,
    height: height / 2,
  },
  mainInfoHolder: {
    flex: 1,
    alignItems: 'center',
  },
  userInfoHolder: {
    flex: 1,
    backgroundColor: white,
    width: width,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    borderRadius: 20,
    position: 'absolute',
    height: height / 2.8,
    marginTop: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtons: {
    flex: 1,
    backgroundColor: white,
    width: width,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    height: height / 8,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoFooter: {
    flex: 1,
    flexDirection: 'row',
    width: width - 50,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  userNameLabel: {
    fontFamily: 'bold',
    color: blue,
    fontSize: 20,
  },
  userCompany: {
    fontFamily: 'regular',
    color: gray,
    fontSize: 12,
  },
  userNID: {
    fontFamily: 'semiBold',
    fontSize: 16,
    color: blue,
  },
  licenseLabel: {
    fontFamily: 'regular',
    color: blue,
  },
  footerIcon: {
    backgroundColor: blue,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  footerSideHeader: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerSide: {},
  licenseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLabel: {
    fontFamily: 'bold',
    color: gray,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRightColor: gray,
    borderRightWidth: 1,
  },
  btnLabel: {
    marginLeft: 5,
    fontFamily: 'bold',
    fontSize: 16,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtnContainer: {
    position: 'absolute',
    paddingLeft: 10,
    paddingTop: 10,
  },
  backLabel: {
    color: white,
    fontSize: 18,
  },
});
