import React, { useContext, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import LocationContext from "./Context/LocationContext";

const ScannerScreen = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const { setLocationData } = useContext(LocationContext);

  if (!permission) {
    return <Text>Loading...</Text>;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>Camera permission is required to use this app.</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleQrCodeScanner = ({ data }) => {
    setScanned(true);
    setLocationData(data)
    navigation.navigate("Home");
  };
  return (
    <View className="flex-1 items-center">
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleQrCodeScanner}
      >
        <View>
          <Text className="w-screen flex-1"></Text>
        </View>
      </CameraView>
    </View>
  );
};

export default ScannerScreen;
