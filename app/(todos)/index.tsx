import React from "react";
import { Text, View } from "react-native";
import TodoList from "../../src/screens/todo-list";

const Todos = () => {
  return (
    <View className="bg-red">
      <Text className="text-[24px]">abc</Text>

      <TodoList />
    </View>
  );
};

export default Todos;
