import React, { Component } from 'react';
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

  handleCompany = (data) => {
    this.setState({ selCompany: data });
    this.props.dispatch(fetchCompanyCategories(data));
  };

  handleCompanyCategory = (data) => {
    this.setState({ selCompanyCategory: data });
    this.props.dispatch(fetchCategoryOffences(data));
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
    } = this.state;

    let response = true;
    let errorMessage = '';

    if (!location) {
      response = false;
      errorMessage = 'Location is required';
    }
    if (!plate) {
      response = false;
      errorMessage = 'Plate Number is required';
    }
    if (selectedDocs.length === 0) {
      response = false;
      errorMessage = 'Select atleast one document';
    }
    // TODO: Validate Plate
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
    } = this.state;
    const {
      companyOffences,
      companyCategories,
      companies,
      documents,
    } = this.props;

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
            <KeyboardAvoidingView
              style
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              <ScrollView
                style={styles.txtBoxContainer}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.txtBoxContainer}>
                  <View style={[styles.txtBoxContWrapper, { height: 70 }]}>
                    <View style={[styles.txtBoxCont, { height: 70 }]}>
                      <View style={[styles.txtLabelCont, { marginBottom: 0 }]}>
                        <Text style={styles.txtLabel}>Company</Text>
                      </View>
                      <View style={styles.txtBoxHolder}>
                        <Picker
                          mode="dropdown"
                          style={styles.picker}
                          onValueChange={(value) => this.handleCompany(value)}
                          placeholder="Select Company"
                          selectedValue={selCompany}
                        >
                          <Picker.Item label="Select Company" value={null} />
                          {companies &&
                            companies.map(({ id, company_name }, index) => (
                              <Picker.Item
                                key={index}
                                label={company_name}
                                value={id}
                                style={styles.singlePickerItem}
                              />
                            ))}
                        </Picker>
                      </View>
                    </View>
                  </View>
                  {companyCategories.length !== 0 && (
                    <View style={[styles.txtBoxContWrapper, { height: 70 }]}>
                      <View style={[styles.txtBoxCont, { height: 70 }]}>
                        <View
                          style={[styles.txtLabelCont, { marginBottom: 0 }]}
                        >
                          <Text style={styles.txtLabel}>Company Category</Text>
                        </View>
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
                            {companyCategories &&
                              companyCategories.map(
                                ({ id, company_category }, index) => (
                                  <Picker.Item
                                    key={index}
                                    label={company_category}
                                    value={id}
                                    style={styles.singlePickerItem}
                                  />
                                )
                              )}
                          </Picker>
                        </View>
                      </View>
                    </View>
                  )}
                  {companyOffences.length !== 0 && (
                    <View style={styles.txtBoxContWrapper}>
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
                            companyOffences={companyOffences}
                            handleThisOffence={this.handleThisOffence}
                            selectedItems={selectedItems}
                          />
                        </View>
                      </View>
                    </View>
                  )}
                  <View style={styles.txtBoxContWrapper}>
                    <View style={styles.txtBoxCont}>
                      <View style={styles.txtLabelCont}>
                        <Text style={styles.txtLabel}>Documents</Text>
                      </View>
                      <View style={styles.txtBoxHolder}>
                        <TouchableOpacity
                          onPress={() => this.setState({ isDocsVisible: true })}
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
                  </View>
                  <View style={styles.txtBoxContWrapper}>
                    <View style={styles.txtBoxCont}>
                      <View style={styles.txtLabelCont}>
                        <Text style={styles.txtLabel}>Plate</Text>
                      </View>
                      <View style={styles.txtBoxHolder}>
                        <TextInput
                          style={styles.txtBoxInput}
                          onChangeText={(plate) => this.setState({ plate })}
                          value={plate}
                          placeholder="Input Plate Number"
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.txtBoxContWrapper}>
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
                        />
                      </View>
                    </View>
                  </View>
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
}) => {
  return {
    companyOffences: Object.values(companyOffences),
    companies: Object.values(companies),
    companyCategories: Object.values(companyCategories),
    userId: authedUser && authedUser.id,
    documents: Object.values(documents),
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
    color: gray,
    fontFamily: 'regular',
  },
  singlePickerItem: {
    fontFamily: 'regular',
  },
});
