// import { StatusBar } from "expo-status-bar";
// import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/homeScreen";
import ScannerScreen from "./components/scannerScreen";
import LocationContextProvider from "./components/Context/locationProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LocationContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scanner" component={ScannerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationContextProvider>
  );
}
