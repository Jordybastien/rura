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
import { handleSaveDriverTicket } from '../actions/driver';
import { Spinner } from 'native-base';

const { width, height } = Dimensions.get('window');

class DriverTicketScreen extends Component {
  state = {
    selectedItems: [],
    selectedDocs: [],
    isModalVisible: false,
    isDocsVisible: false,
    location: '',
    plate: '',
    loading: false,
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

  handleCompany = (data) => this.setState({ selCompany: data });

  handleCompanyCategory = (data) => this.setState({ selCompanyCategory: data });

  handleRecordCompany = () => {
    const { response, data } = this.validateData();

    if (response) {
      this.setState({ loading: true });
      this.props.dispatch(handleSaveDriverTicket(data)).then((res) => {
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
      selectedDocs,
      location,
      plate,
      loading,
    } = this.state;
    const { driver, userId } = this.props;

    let response = true;
    let errorMessage = '';

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
    if (selectedDocs.length === 0) {
      response = false;
      errorMessage = 'Select atleast one document';
    }
    if (selectedItems.length === 0) {
      response = false;
      errorMessage = 'Select atleast one offence';
    }

    let data = {};

    data.driving_license = driver.driver_license;
    data.company_id = driver.driver_company_name;
    data.user_id = userId;
    data.plate_number = plate;
    data.location = location;
    data.offense_id = selectedItems;
    data.docs_id = selectedDocs;

    errorMessage &&
      Toast.show({
        text1: 'Warning',
        text2: errorMessage,
        type: 'error',
      });
    return { response, data };
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
    const { driverOffences, documents } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerLabel}>Driver Invoice</Text>
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
              <View style={styles.txtBoxContainer}>
                <View style={styles.txtBoxContWrapper}>
                  <View style={styles.txtBoxCont}>
                    <View style={styles.txtLabelCont}>
                      <Text style={styles.txtLabel}>Offence</Text>
                    </View>
                    <View style={styles.txtBoxHolder}>
                      <TouchableOpacity
                        onPress={() => this.setState({ isModalVisible: true })}
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
                        companyOffences={driverOffences}
                        handleThisOffence={this.handleThisOffence}
                        selectedItems={selectedItems}
                      />
                    </View>
                  </View>
                </View>
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
                      <Text style={styles.txtLabel}>Plate Number</Text>
                    </View>
                    <View style={styles.txtBoxHolder}>
                      <TextInput
                        style={styles.txtBoxInput}
                        onChangeText={(plate) => this.setState({ plate })}
                        value={plate}
                        placeholder="Input Plate Number"
                        maxLength={7}
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
                        onChangeText={(location) => this.setState({ location })}
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
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({
  driverOffences,
  companies,
  companyCategories,
  authedUser,
  documents,
  driver,
}) => {
  return {
    driverOffences: Object.values(driverOffences),
    companies: Object.values(companies),
    companyCategories: Object.values(companyCategories),
    userId: authedUser && authedUser.id,
    documents: Object.values(documents),
    driver,
  };
};

export default connect(mapStateToProps)(DriverTicketScreen);

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

const MultipleDocsSelect = ({
  isModalVisible,
  hideModal,
  documents,
  handleThisDoc,
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
            {documents.map(({ doc_name, id }) => (
              <View style={styles.checkBoxContainer} key={id}>
                <BouncyCheckbox
                  isChecked={selectedItems.includes(id)}
                  textColor={blue}
                  fontFamily="regular"
                  text={doc_name}
                  textStyle={styles.offenceText}
                  onPress={() => handleThisDoc(id)}
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
