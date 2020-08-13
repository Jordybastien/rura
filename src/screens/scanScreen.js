import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Vibration,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { blue, white, gray, orange } from '../utils/colors';

const { width, height } = Dimensions.get('window');

export default function App(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log('=======>type', type);
    console.log('=======>data', data);
    Vibration.vibrate(3000);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handlePause = () => console.log('==========> Paused <==========');

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.headerText}>
          <Text style={styles.headerLabel}>Scan</Text>
        </View>
      </View>
      <View style={styles.mainContent}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? handlePause : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.camera]}
          torchMode="on"
          flashMode="torch"
        />

        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </View>
  );
}

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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 100,
    paddingBottom: 100,
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
  camera: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});
