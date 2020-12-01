import React, { Component, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { blue, white, gray, orange } from '../utils/colors';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
  MaterialIcons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { formatDate } from '../utils/date';
import { handleInitialData, handleDriverData } from '../actions/initialData';
import { refreshUser } from '../router';

const { width, height } = Dimensions.get('window');

class HomeScreen extends Component {
  state = {
    refreshing: false,
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    refreshUser(this.props).then((user) => {
      if (user) {
        this.props.dispatch(handleDriverData(user.id));
      }
    });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  };

  render() {
    const { userName, userRole, myInvoices } = this.props;
    const { refreshing } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <View>
              <Text style={styles.headerLabel}>{userName}</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>{userRole}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.headerImg}
            onPress={() => this.props.navigation.navigate('ProfileScreen')}
          >
            {/* <FontAwesome name="user-circle-o" size={40} color={white} /> */}
            <Text style={styles.offlineLabel}>10 offline data</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContent}>
          <ImageBackground
            source={require('../../assets/bg-3.png')}
            style={[
              styles.bgContent,
              userRole &&
                userRole.toLowerCase() === 'user' && {
                  paddingTop: 20,
                  paddingBottom: 0,
                },
            ]}
          >
            {userRole && userRole.toLowerCase() === 'user' ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollViewCont}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                  />
                }
              >
                <View style={styles.invoicesContainer}>
                  {myInvoices && myInvoices.length !== 0 ? (
                    myInvoices.map((invoice, index) => (
                      <View style={styles.invoiceCard} key={index}>
                        <View style={styles.invoiceHeader}>
                          <View style={styles.arrangeContent}>
                            <FontAwesome5
                              name="file-invoice"
                              size={18}
                              color={blue}
                            />
                            <Text
                              style={[
                                styles.invoiceNumberLabel,
                                { color: blue, fontSize: 15, marginLeft: 2 },
                              ]}
                            >
                              Invoice No:{' '}
                            </Text>
                            <Text style={styles.invoiceNumberLabel}>
                              {' '}
                              {invoice.invoice_code}
                            </Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            {invoice.invoice_status.toLowerCase() ===
                              'pending' && (
                              <View
                                style={[
                                  styles.statusContainer,
                                  styles.deActivated,
                                ]}
                              >
                                <Text style={styles.statusLabel}>
                                  {invoice.invoice_status}
                                </Text>
                              </View>
                            )}
                            {invoice.invoice_status.toLowerCase() ===
                              'paid' && (
                              <View
                                style={[
                                  styles.statusContainer,
                                  styles.activated,
                                ]}
                              >
                                <Text style={styles.statusLabel}>
                                  {invoice.invoice_status}
                                </Text>
                              </View>
                            )}
                            {invoice.invoice_status.toLowerCase() ===
                              'canceled' && (
                              <View
                                style={[styles.statusContainer, styles.pending]}
                              >
                                <Text style={styles.statusLabel}>
                                  {invoice.invoice_status}
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>
                        <View style={styles.invoiceFooter}>
                          <View style={styles.footerContent}>
                            <View style={styles.footerIcon}>
                              <FontAwesome
                                name="money"
                                size={24}
                                color={white}
                              />
                            </View>
                            <View>
                              <Text style={styles.amountLabel}>Amount</Text>
                            </View>
                            <View>
                              <Text style={styles.amountValue}>
                                RWF {parseInt(invoice.Amount).toLocaleString()}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.footerContent}>
                            <View style={styles.footerIcon}>
                              <Entypo
                                name="location-pin"
                                size={24}
                                color={white}
                              />
                            </View>
                            <View>
                              <Text style={styles.amountLabel}>Location</Text>
                            </View>
                            <View>
                              <Text style={styles.amountValue}>
                                {invoice.location}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.footerContent}>
                            <View style={styles.footerIcon}>
                              <Fontisto name="date" size={24} color={white} />
                            </View>
                            <View>
                              <Text style={styles.amountLabel}>Due Date</Text>
                            </View>
                            <View>
                              <Text style={styles.amountValue}>
                                {invoice.due_date &&
                                  formatDate(invoice.due_date)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))
                  ) : (
                    <View
                      style={{
                        height: height - 200,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <View>
                          <MaterialIcons
                            name="do-not-disturb"
                            size={50}
                            color={blue}
                          />
                        </View>
                        <Text style={styles.notFoundLabel}>
                          No Invoices found
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </ScrollView>
            ) : (
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
                    <AntDesign name="car" size={50} color={white} />
                  </View>
                  <Text style={styles.iconLabel}>Driver</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.cardContainer, { backgroundColor: blue }]}
                  onPress={() =>
                    this.props.navigation.navigate('CompanyScreen')
                  }
                >
                  <LinearGradient
                    colors={['rgba(0,0,0,0.2)', 'transparent']}
                    style={styles.gradient}
                  />
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      name="office-building"
                      size={50}
                      color={white}
                    />
                  </View>
                  <Text style={[styles.iconLabel, { color: white }]}>
                    Company
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ authedUser, myInvoices }) => {
  return {
    userName: authedUser && authedUser.name,
    userRole:
      authedUser && authedUser.roles && authedUser.roles[0].display_name,
    myInvoices: Object.values(myInvoices).reverse(),
  };
};

export default connect(mapStateToProps)(HomeScreen);

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
    ...ifIphoneX(
      {
        marginBottom: 25,
      },
      {
        marginBottom: 0,
      }
    ),
  },
  mainContent: {
    ...ifIphoneX(
      {
        height: height - 250,
      },
      {
        height: height - 200,
      }
    ),
    backgroundColor: white,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 100,
    paddingBottom: 100,
  },
  bgContent: {
    height: height - 200,
    backgroundColor: white,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    color: white,
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
  scrollViewCont: {
    color: white,
    // height: height - 200,
  },
  invoicesContainer: {
    // height: height - 200,
  },
  invoiceCard: {
    borderBottomColor: blue,
    borderBottomWidth: 7,
    width: width - 50,
    height: 170,
    backgroundColor: white,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    padding: 5,
    marginBottom: 18,
  },
  invoiceHeader: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  invoiceFooter: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
    paddingLeft: 10,
    paddingRight: 10,
  },
  arrangeContent: { flex: 2, flexDirection: 'row', alignItems: 'center' },
  invoiceNumberLabel: {
    fontFamily: 'bold',
    color: orange,
    fontSize: 18,
  },
  statusContainer: {
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  pending: {
    backgroundColor: '#e6f6ff',
    borderColor: '#90d5ff',
  },
  activated: {
    backgroundColor: '#f6ffec',
    borderColor: '#b7ea8f',
  },
  deActivated: {
    backgroundColor: '#fff2ef',
    borderColor: '#ffccc6',
  },
  statusLabel: { fontFamily: 'regular', fontSize: 13 },
  footerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerIcon: {
    backgroundColor: blue,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  amountLabel: {
    color: gray,
    fontFamily: 'regular',
    fontSize: 13,
  },
  amountValue: {
    color: blue,
    fontFamily: 'bold',
    paddingTop: 10,
    fontSize: 13,
  },
  notFoundLabel: {
    fontFamily: 'bold',
    color: blue,
    fontSize: 20,
  },
  offlineLabel: {
    fontFamily: 'regular',
    color: white,
  },
});
