import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Modal,
  ToastAndroid,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import LocationContext from "./Context/LocationContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { locationData, setLocationData } = useContext(LocationContext);

  const [Data, setData] = useState([]);
  const [isVisible, setisVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [number, setNumber] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://api-staging.inveesync.in/test/get-items",
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ToggleComponent = () => {
    setisVisible(!isVisible);
  };

  const handleSelect = (item) => {
    setSelectedItem([item]);
    ToggleComponent();
  };
  function showToast(errorMessage) {
    ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
  }

  const submit = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "https://api-staging.inveesync.in/test/submit",
        data: selectedItem,
      });
      if (response) {
        setSelectedItem([]);
        setLocationData("");
        setNumber('')
        showToast(response.data.msg)
        // console.log(response.data.msg)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitBtnClick = () => {
    if (locationData === "") {
      return showToast("go to scanner Screen");
    }
    // console.log(selectedItem);
    if (selectedItem.length === 0) {
      return showToast("select items");
    }
    if (number === "") {
      return showToast("enter some value in textArea");
    }
    const isLocationRight = selectedItem[0].allowed_locations.includes(
      locationData
    );

    if (isLocationRight) {
      const updateItems = () => {
        const updatedItems = selectedItem.map((item) => {
          const { id, item_name } = item;
          return { id, item_name, location: locationData };
        });
        setSelectedItem(updatedItems);
      };
      updateItems();
      console.log(selectedItem);
      console.log("heyyy! congrats");
      setLocationData("");
      submit();
    } else {
      showToast("error. Incorrect location");
      setLocationData("");
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="">HomeScreen</Text>
      <TouchableOpacity
        className="flex bg-white w-9/12 h-12 border rounded-lg justify-center items-center my-4"
        onPress={ToggleComponent}
      >
        <Text>Select Item here</Text>
      </TouchableOpacity>
      <Modal
        visible={isVisible}
        transparent={true}
        onRequestClose={ToggleComponent}
      >
        <View className="flex w-11/12 h-48 justify-center bg-slate-50 items-center">
          <FlatList
            data={Data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <View className="w-full h-12 flex justify-center">
                    <Text className="text-lg">{item.item_name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Modal>
      <TextInput
        keyboardType="numeric"
        placeholder="Enter a number"
        value={number}
        onChangeText={(text) => setNumber(text)}
        className="w-9/12 h-12 border rounded-lg justify-center items-center my-4 px-4"
      />
      <Button
        title="go to scanner screen"
        onPress={() => {
          navigation.navigate("Scanner");
        }}
      />
      <View className="my-2">
        <Button title="submit" onPress={onSubmitBtnClick} />
      </View>
    </View>
  );
};

export default HomeScreen;
