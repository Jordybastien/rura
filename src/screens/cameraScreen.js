import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Vibration,
  TouchableOpacity,
} from 'react-native';
import { blue, white, gray, orange } from '../utils/colors';
import { Camera } from 'expo-camera';
import { FontAwesome5 } from '@expo/vector-icons';
import { Bounce } from 'react-native-animated-spinkit';

const { width, height } = Dimensions.get('window');

export default function App(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [bulb, setBulb] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [status, setStatus] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    Vibration.vibrate(3000);
    props.navigation.reset({
      index: 0,
      routes: [
        {
          name: 'ScanDetailsScreen',

          params: {
            isScan: true,
            idNumber: data.split(' ').join('').substr(0, 16),
          },
        },
      ],
    });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.headerText}>
          <Text style={styles.headerLabel}>Scan</Text>
        </View>
      </View>
      <View style={styles.mainContent}>
        <Camera
          style={[StyleSheet.absoluteFillObject, styles.cameraContainer]}
          type={type}
          flashMode={bulb ? 'torch' : undefined}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          onCameraReady={() => setStatus(true)}
        >
          <View style={styles.spinContainer}>
            <View>{status && <Bounce size={48} color={blue} />}</View>
          </View>
          <View style={styles.panelContainer}>
            <TouchableOpacity
              style={styles.bulbContainer}
              onPress={() => setBulb(!bulb)}
            >
              <FontAwesome5 name="lightbulb" size={40} color={white} />
            </TouchableOpacity>
          </View>
        </Camera>
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
  panelContainer: {
    backgroundColor: blue,
    height: 80,
    opacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bulbContainer: {
    width: 70,
    height: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  spinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
});
