import React, { Component, createRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { blue, white, gray, orange, lowGray } from '../utils/colors';
import Modal from 'react-native-modal';
import {
  Octicons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { connect } from 'react-redux';
import { Picker, Item } from 'native-base';
import Toast from 'react-native-toast-message';
import { handleSaveCompany } from '../actions/company';
import { Spinner } from 'native-base';
import {
  fetchCompanyCategories,
  fetchCategoryOffences,
} from '../actions/company';
import MultipleDocsSelect from '../components/MultipleSelect';
import DarkOverlay from 'react-native-loading-spinner-overlay';
import { hideLoading } from '../actions/loading';

const { width, height } = Dimensions.get('window');

class CompanyScreen extends Component {
  state = {
    selectedItems: [],
    isModalVisible: false,
    selCompany: '',
    selCompanyCategory: '',
    location: '',
    plate: '',
    loading: false,
    selectedDocs: [],
    isDocsVisible: false,
    categoriesToUse: null,
    offencesToUse: null,
    driverLicense: '',
    driverName: '',
  };

  handleThisOffence = (id) => {
    const { selectedItems } = this.state;
    const check = selectedItems.filter((el) => el === id);
    if (check.length === 0) {
      selectedItems.push(id);
      this.setState({ selectedItems });
    } else {
      const toSave = selectedItems.filter((el) => el !== id);
      this.setState({ selectedItems: toSave });
    }
  };

  handleCompany = (data) =>
    this.setState({
      selCompany: data,
      categoriesToUse: this.props.companiesDetails.filter(
        ({ id }) => id === data
      ),
    });

  handleCompanyCategory = (data) => {
    const { categoriesToUse } = this.state;
    if (categoriesToUse) {
      if (categoriesToUse[0].CompanyCategories.length !== 0) {
        const selectedCategory = categoriesToUse[0].CompanyCategories.filter(
          (item) => item.company_category_id === data
        );
        const selectedOffences =
          selectedCategory[0].Category_names[0].OffensePrice;
        if (selectedOffences.length !== 0) {
          this.setState({
            selCompanyCategory: data,
            offencesToUse: selectedOffences,
          });
        } else {
          Toast.show({
            text1: 'Warning',
            text2:
              'No recorded offence for this category, Please Contact Administrator',
            type: 'error',
          });
        }
      }
    } else {
      Toast.show({
        text1: 'Warning',
        text2: 'Select Company First',
        type: 'error',
      });
    }
  };

  handleRecordCompany = () => {
    const { response, data } = this.validateData();

    if (response) {
      this.setState({ loading: true });
      this.props.dispatch(handleSaveCompany(data)).then((res) => {
        this.setState({ loading: false });
        if (res.type !== 'LOG_ERROR') {
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'SuccessScreen' }],
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
    const {
      selectedItems,
      selCompany,
      selCompanyCategory,
      location,
      plate,
      loading,
      selectedDocs,
      driverLicense,
      driverName,
    } = this.state;

    let response = true;
    let errorMessage = '';

    // if (!driverLicense) {
    //   response = false;
    //   errorMessage = 'Driver License Number is required';
    // } else if (driverLicense.length < 16 || driverLicense.length > 16) {
    //   response = false;
    //   errorMessage = 'Driver License Number can not be less than 16';
    // }
    if (!driverName) {
      response = false;
      errorMessage = 'Driver Name is required';
    }
    if (!location) {
      response = false;
      errorMessage = 'Location is required';
    }
    if (!plate) {
      response = false;
      errorMessage = 'Plate Number is required';
    } else if (
      plate.split(' ').join('').length < 7 ||
      plate.split(' ').join('').length > 7 ||
      !/^[a-zA-Z]+$/.test(plate.substr(0, 3)) ||
      !/^\d+$/.test(plate.substr(3, 3)) ||
      !/^[a-zA-Z]+$/.test(plate.substr(6, 1))
    ) {
      response = false;
      errorMessage = 'Invalid Plate Number';
    }
    // if (selectedDocs.length === 0) {
    //   response = false;
    //   errorMessage = 'Select atleast one document';
    // }
    if (selectedItems.length === 0) {
      response = false;
      errorMessage = 'Select atleast one offence';
    }
    if (!selCompanyCategory) {
      response = false;
      errorMessage = 'Company Category is required';
    }
    if (!selCompany) {
      response = false;
      errorMessage = 'Company is required';
    }
    let data = {};

    data.company_category_id = selCompanyCategory;
    data.company_id = selCompany;
    data.location = location;
    data.offense_id = selectedItems;
    data.plate_number = plate;
    data.user_id = this.props.userId;
    data.docs_id = selectedDocs;
    data.driver_licence = driverLicense;
    data.driver_names = driverName;

    errorMessage &&
      Toast.show({
        text1: 'Warning',
        text2: errorMessage,
        type: 'error',
      });
    return { response, data };
  };

  handleThisDoc = (id) => {
    const { selectedDocs } = this.state;
    const check = selectedDocs.filter((el) => el === id);
    if (check.length === 0) {
      selectedDocs.push(id);
      this.setState({ selectedDocs });
    } else {
      const toSave = selectedDocs.filter((el) => el !== id);
      this.setState({ selectedDocs: toSave });
    }
  };

  render() {
    const {
      selectedItems,
      isModalVisible,
      selCompany,
      selCompanyCategory,
      location,
      plate,
      loading,
      selectedDocs,
      isDocsVisible,
      categoriesToUse,
      offencesToUse,
      driverLicense,
      driverName,
    } = this.state;
    const {
      companyOffences,
      companyCategories,
      companies,
      documents,
      loading: propsLoading,
      companiesDetails,
    } = this.props;
    this.companyRef = createRef();

    return (
      <View style={styles.container}>
        <DarkOverlay
          visible={propsLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
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
            <KeyboardAvoidingView
              style
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              <ScrollView
                style={styles.txtBoxContainer}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.txtBoxContainer}>
                  <View style={[styles.txtBoxContWrapper, { flex: 1 }]}>
                    {/* height: 70 */}
                    <View style={[styles.txtBoxCont, { flex: 1 }]}>
                      {/* <View style={[styles.txtLabelCont, { marginBottom: 0 }]}>
                        <Text style={styles.txtLabel}>Company</Text>
                      </View> */}
                      <View style={styles.txtBoxHolder}>
                        <Picker
                          mode="dropdown"
                          style={styles.picker}
                          onValueChange={(value) => this.handleCompany(value)}
                          placeholder="Select Company"
                          selectedValue={selCompany}
                        >
                          <Picker.Item label="Select Company" value={null} />
                          {companiesDetails &&
                            companiesDetails.map(
                              ({ id, company_name }, index) => (
                                <Picker.Item
                                  key={index}
                                  label={company_name}
                                  value={id}
                                />
                              )
                            )}
                        </Picker>
                      </View>
                    </View>
                  </View>
                  {categoriesToUse && (
                    <View style={[styles.txtBoxContWrapper, { flex: 1 }]}>
                      {/* height: 70 */}
                      <View style={[styles.txtBoxCont, { flex: 1 }]}>
                        {/* <View
                          style={[styles.txtLabelCont, { marginBottom: 0 }]}
                        >
                          <Text style={styles.txtLabel}>Company Category</Text>
                        </View> */}
                        <View style={styles.txtBoxHolder}>
                          <Picker
                            mode="dropdown"
                            style={styles.picker}
                            onValueChange={(value) =>
                              this.handleCompanyCategory(value)
                            }
                            placeholder="Select Company Category"
                            selectedValue={selCompanyCategory}
                          >
                            <Picker.Item
                              label="Select Company Category"
                              value={null}
                            />
                            {categoriesToUse[0].CompanyCategories &&
                              categoriesToUse[0].CompanyCategories.map(
                                (categoryItem, index) => (
                                  <Picker.Item
                                    key={index}
                                    label={
                                      categoryItem.Category_names[0]
                                        .company_category
                                    }
                                    value={categoryItem.company_category_id}
                                    style={styles.singlePickerItem}
                                  />
                                )
                              )}
                          </Picker>
                        </View>
                      </View>
                    </View>
                  )}
                  {offencesToUse && (
                    <TouchableOpacity
                      style={styles.txtBoxContWrapper}
                      onPress={() => this.setState({ isModalVisible: true })}
                      activeOpacity={1}
                    >
                      <View style={styles.txtBoxCont}>
                        <View style={styles.txtLabelCont}>
                          <Text style={styles.txtLabel}>Offence</Text>
                        </View>
                        <View style={styles.txtBoxHolder}>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({ isModalVisible: true })
                            }
                          >
                            <Text style={styles.txtLabel}>
                              {selectedItems.length === 0
                                ? 'Select Offence(s)'
                                : `${selectedItems.length} offence
                            `}
                            </Text>
                          </TouchableOpacity>
                          <MultipleSelect
                            isModalVisible={isModalVisible}
                            hideModal={() =>
                              this.setState({ isModalVisible: false })
                            }
                            companyOffences={offencesToUse}
                            handleThisOffence={this.handleThisOffence}
                            selectedItems={selectedItems}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.txtBoxContWrapper}
                    onPress={() => this.setState({ isDocsVisible: true })}
                    activeOpacity={1}
                  >
                    <View style={styles.txtBoxCont}>
                      <View style={styles.txtLabelCont}>
                        <Text style={styles.txtLabel}>Documents</Text>
                      </View>
                      <View style={styles.txtBoxHolder}>
                        <TouchableOpacity
                          onPress={() => this.setState({ isDocsVisible: true })}
                          activeOpacity={1}
                        >
                          <Text style={styles.txtLabel}>
                            {selectedDocs.length === 0
                              ? 'Select confiscated Document(s)'
                              : `${selectedDocs.length} documents
                            `}
                          </Text>
                        </TouchableOpacity>
                        <MultipleDocsSelect
                          isModalVisible={isDocsVisible}
                          hideModal={() =>
                            this.setState({ isDocsVisible: false })
                          }
                          documents={documents}
                          handleThisDoc={this.handleThisDoc}
                          selectedItems={selectedDocs}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.txtBoxContWrapper}
                    onPress={() => {
                      this.plateTxt.focus();
                    }}
                    activeOpacity={1}
                  >
                    <View style={styles.txtBoxCont}>
                      <View style={styles.txtLabelCont}>
                        <Text style={styles.txtLabel}>Plate Number</Text>
                      </View>
                      <View style={styles.txtBoxHolder}>
                        <TextInput
                          style={styles.txtBoxInput}
                          onChangeText={(plate) =>
                            this.setState({ plate: plate.split(' ').join('') })
                          }
                          value={plate}
                          placeholder="Input Plate Number"
                          maxLength={7}
                          ref={(input) => {
                            this.plateTxt = input;
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.txtBoxContWrapper}
                    onPress={() => {
                      this.locationTxt.focus();
                    }}
                    activeOpacity={1}
                  >
                    <View style={styles.txtBoxCont}>
                      <View style={styles.txtLabelCont}>
                        <Text style={styles.txtLabel}>Location</Text>
                      </View>
                      <View style={styles.txtBoxHolder}>
                        <TextInput
                          style={styles.txtBoxInput}
                          onChangeText={(location) =>
                            this.setState({ location })
                          }
                          value={location}
                          placeholder="Input Location"
                          ref={(input) => {
                            this.locationTxt = input;
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.txtBoxContWrapper}
                    onPress={() => {
                      this.driverName.focus();
                    }}
                    activeOpacity={1}
                  >
                    <View style={styles.txtBoxCont}>
                      <View style={styles.txtLabelCont}>
                        <Text style={styles.txtLabel}>Driver Name</Text>
                      </View>
                      <View style={styles.txtBoxHolder}>
                        <TextInput
                          style={styles.txtBoxInput}
                          onChangeText={(driverName) =>
                            this.setState({ driverName })
                          }
                          value={driverName}
                          placeholder="Input Driver Name"
                          ref={(input) => {
                            this.driverName = input;
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.txtBoxContWrapper}
                    onPress={() => {
                      this.driverLicense.focus();
                    }}
                    activeOpacity={1}
                  >
                    <View style={styles.txtBoxCont}>
                      <View style={styles.txtLabelCont}>
                        <Text style={styles.txtLabel}>Driving License</Text>
                      </View>
                      <View style={styles.txtBoxHolder}>
                        <TextInput
                          style={styles.txtBoxInput}
                          onChangeText={(driverLicense) =>
                            !isNaN(driverLicense) &&
                            this.setState({ driverLicense })
                          }
                          value={driverLicense}
                          placeholder="Input Driving License"
                          ref={(input) => {
                            this.driverLicense = input;
                          }}
                          // maxLength={16}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.buttonHolder]}
                    onPress={this.handleRecordCompany}
                  >
                    <View style={[styles.buttonContainer, { flex: 1 }]}>
                      {loading ? (
                        <Spinner color={white} />
                      ) : (
                        <View>
                          <FontAwesome name="save" size={30} color={white} />
                          <Text style={styles.btnLabel}>Save</Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({
  companyOffences,
  companies,
  companyCategories,
  authedUser,
  documents,
  loading,
  companiesDetails,
}) => {
  return {
    companyOffences: Object.values(companyOffences),
    companies: Object.values(companies),
    companyCategories: Object.values(companyCategories),
    userId: authedUser && authedUser.id,
    documents: Object.values(documents),
    loading,
    companiesDetails: Object.values(companiesDetails),
  };
};

export default connect(mapStateToProps)(CompanyScreen);

const MultipleSelect = ({
  isModalVisible,
  hideModal,
  companyOffences,
  handleThisOffence,
  selectedItems,
}) => {
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={hideModal}>
      <View style={styles.modalContainer}>
        <View>
          <Text style={styles.selectedItems}>
            {selectedItems.length} Item{selectedItems.length > 1 && 's'}{' '}
            selected
          </Text>
        </View>
        <View style={styles.offencesContainer}>
          <ScrollView style={styles.scrollView}>
            {companyOffences.map(({ offense_name, id }) => (
              <View style={styles.checkBoxContainer} key={id}>
                <BouncyCheckbox
                  isChecked={selectedItems.includes(id)}
                  textColor={blue}
                  fontFamily="regular"
                  text={offense_name}
                  textStyle={styles.offenceText}
                  onPress={() => handleThisOffence(id)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={[styles.buttonHolder, { width: 120 }]}
          onPress={hideModal}
        >
          <View style={styles.buttonContainer}>
            <Octicons name="thumbsup" size={30} color={white} />
            <Text style={styles.btnLabel}>Done</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

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
    // paddingBottom: 30,
    alignItems: 'center',
  },
  headerLabel: {
    color: white,
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
  modalContainer: {
    backgroundColor: white,
    borderColor: lowGray,
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 20,
    elevation: 4,
    width: width - 50,
    padding: 20,
    height: height - 150,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonHolder: {
    backgroundColor: white,
    height: 60,
    borderRadius: 20,

    flexDirection: 'row',
    marginBottom: 50,
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
  selectedItems: {
    color: blue,
    fontFamily: 'bold',
  },
  offencesContainer: {
    marginBottom: 40,
    width: width - 100,
  },
  scrollView: {
    height: height / 1.8,
  },
  offenceText: {
    width: width - 150,
  },
  picker: {
    width: width,
  },
  singlePickerItem: {
    fontFamily: 'regular',
  },
  spinnerTextStyle: {
    fontFamily: 'regular',
    color: gray,
  },
});
