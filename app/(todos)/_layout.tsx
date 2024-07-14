import { View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import Header from "../../src/components/header";

const TodosLayout = () => {
  return (
    <>
      <Header />
      <View>
        <Slot />
      </View>
    </>
  );
};

export default TodosLayout;
