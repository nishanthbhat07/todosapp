import { View, Text } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View className="flex flex-row justify-between p-[5%] bg-primaryColor">
      <Text className="text-white font-bold text-[20px]">TaskTrack</Text>
    </View>
  );
};

export default Header;
