import React from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { blue, white, gray, orange, lowGray } from '../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  Octicons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

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

export default MultipleDocsSelect;

const styles = StyleSheet.create({
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
});
