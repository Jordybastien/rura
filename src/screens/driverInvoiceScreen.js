import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {
  blue,
  white,
  gray,
  orange,
  rose,
  lowRose,
  moreGray,
} from '../utils/colors';
import {
  FontAwesome,
  FontAwesome5,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';
import { connect } from 'react-redux';
import { formatDate } from '../utils/date';

const { width, height } = Dimensions.get('window');

class DriverInvoiceScreen extends Component {
  state = {
    selIdNumber: '',
    loading: false,
    showError: false,
  };

  render() {
    const { selIdNumber, loading, showError } = this.state;
    const { driver, driverInvoices } = this.props;

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
              {/* TODO: Driver Code */}
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollViewCont}
            >
              <View style={styles.invoicesContainer}>
                {/* <View style={styles.invoiceCard}>
                  <View style={styles.invoiceHeader}>
                    <View style={styles.arrangeContent}>
                      <FontAwesome5
                        name="file-invoice"
                        size={18}
                        color={blue}
                      />
                      <Text style={styles.invoiceNumberLabel}> #104578909</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <View style={[styles.statusContainer, styles.pending]}>
                        <Text style={styles.statusLabel}>Pending</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.invoiceFooter}>
                    <View style={styles.footerContent}>
                      <View style={styles.footerIcon}>
                        <FontAwesome name="money" size={24} color={white} />
                      </View>
                      <View>
                        <Text style={styles.amountLabel}>Amount</Text>
                      </View>
                      <View>
                        <Text style={styles.amountValue}>RWF 100,000</Text>
                      </View>
                    </View>
                    <View style={styles.footerContent}>
                      <View style={styles.footerIcon}>
                        <Entypo name="location-pin" size={24} color={white} />
                      </View>
                      <View>
                        <Text style={styles.amountLabel}>Location</Text>
                      </View>
                      <View>
                        <Text style={styles.amountValue}>Nyamirambo</Text>
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
                        <Text style={styles.amountValue}>01 Jun 2020</Text>
                      </View>
                    </View>
                  </View>
                </View> */}
                {/* Another Card */}
                {driverInvoices.map((invoice, index) => (
                  <View style={styles.invoiceCard} key={index}>
                    <View style={styles.invoiceHeader}>
                      <View
                        style={[
                          styles.arrangeContent,
                          { alignItems: 'flex-start' },
                        ]}
                      >
                        <FontAwesome5
                          name="file-invoice"
                          size={18}
                          color={orange}
                        />
                        <Text
                          style={[
                            styles.invoiceNumberLabel,
                            { color: blue, fontSize: 15, marginLeft: 2 },
                          ]}
                        >
                          Invoice No:{' '}
                        </Text>
                        <Text
                          style={[
                            styles.invoiceNumberLabel,
                            {
                              fontFamily: 'regular',
                              fontSize: 15,
                              color: moreGray,
                            },
                          ]}
                        >
                          {invoice.invoice_code}
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <View
                          style={[styles.statusContainer, styles.deActivated]}
                        >
                          <Text style={styles.statusLabel}>
                            {invoice.invoice_status}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.newInvoiceFooter}>
                      <View style={styles.newInvoiceItem}>
                        <View
                          style={[styles.newInvoiceIcon, { marginRight: 5 }]}
                        >
                          <FontAwesome name="money" size={18} color={orange} />
                        </View>
                        <View style={styles.newInvoiceLabelContainer}>
                          <Text style={styles.newInvoiceLabel}>Amount: </Text>
                        </View>
                        <View style={styles.newInvoiceLabelContainer}>
                          <Text style={styles.newInvoiceValue}>
                            RWF {parseInt(invoice.Amount).toLocaleString()}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.newInvoiceItem}>
                        <View
                          style={[styles.newInvoiceIcon, { marginRight: 5 }]}
                        >
                          <Entypo
                            name="location-pin"
                            size={18}
                            color={orange}
                          />
                        </View>
                        <View style={styles.newInvoiceLabelContainer}>
                          <Text style={styles.newInvoiceLabel}>Location: </Text>
                        </View>
                        <View style={styles.newInvoiceLabelContainer}>
                          <Text style={styles.newInvoiceValue}>
                            {invoice.location}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.newInvoiceItem}>
                        <View
                          style={[styles.newInvoiceIcon, { marginRight: 5 }]}
                        >
                          <Fontisto name="date" size={18} color={orange} />
                        </View>
                        <View style={styles.newInvoiceLabelContainer}>
                          <Text style={styles.newInvoiceLabel}>Due Date: </Text>
                        </View>
                        <View style={styles.newInvoiceLabelContainer}>
                          <Text style={styles.newInvoiceValue}>
                            {invoice.due_date && formatDate(invoice.due_date)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ driver, driverInvoices }) => {
  return {
    driver,
    driverInvoices: Object.values(driverInvoices).reverse(),
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
  invoiceNumberLabel: {
    fontFamily: 'bold',
    color: orange,
    fontSize: 18,
  },
  arrangeContent: { flex: 2, flexDirection: 'row', alignItems: 'center' },
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
  footerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewCont: {
    color: white,
  },
  newInvoiceFooter: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  newInvoiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  newInvoiceIcon: {},
  newInvoiceLabelContainer: {},
  newInvoiceLabel: {
    fontFamily: 'bold',
    color: blue,
  },
  newInvoiceValue: {
    fontFamily: 'regular',
    color: moreGray,
  },
});
