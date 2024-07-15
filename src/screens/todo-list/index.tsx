import React from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Animated, { FadeInDown } from "react-native-reanimated";
import Card from "../../components/card";
import { useReplicache } from "../../contexts/replicache";
import { useSpaceIDList, useTodos } from "./hooks";
import IconWrapper from "../../components/icon";
import styles from "./styles";
import { colors } from "../../contants/colors";

const TodoList = () => {
  const { setListId, listId } = useReplicache();
  const { spaceIds, createSpaceId } = useSpaceIDList();
  const {
    toggleTodosCompleted,
    addTodos,
    updateTodos,
    deleteTodos,
    todoName,
    setTodoName,
    todos,
  } = useTodos();
  todos.sort((a, b) => a.sort - b.sort);

  const handleAddTodos = () => {
    if (listId) {
      addTodos();
    } else {
      createSpaceId(addTodos);
    }
  };

  return (
    <Animated.View entering={FadeInDown} className="flex grow-1 h-[100%]">
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={listId}
        placeholder="Select Space"
        labelField="id"
        valueField="id"
        data={spaceIds}
        onChange={(item) => {
          setListId(item.id);
        }}
        renderLeftIcon={() => (
          <IconWrapper
            style="mr-[3%] self-center items-center"
            onPress={() => createSpaceId()}
            variant="MaterialIcons"
            name="add-circle"
            size={20}
            color={colors.primaryColor}
          />
        )}
      />
      <Text className="px-8">Click the Plus icon to create new space</Text>
      <View className="flex flex-row justify-evenly p-4 mt-[10%] items-center">
        <TextInput
          value={todoName}
          onChangeText={(val) => setTodoName(val)}
          placeholder="Add a new task"
          placeholderTextColor="grey"
          className="w-3/4 p-[3%] rounded-[5] border border-textColorSecondary"
        />
        <TouchableOpacity
          onPress={handleAddTodos}
          activeOpacity={0.65}
          className="px-[4%] py-[3%] text-center rounded-[5] bg-primaryColor"
        >
          <Text className="text-white font-medium">Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerClassName="mt-[2%] mx-[5%]"
        keyExtractor={(item) => item.id}
        data={todos}
        renderItem={({ item }) => (
          <Card
            item={item}
            toggleTodos={toggleTodosCompleted}
            deleteTodos={deleteTodos}
            updateTodos={updateTodos}
          />
        )}
      />
    </Animated.View>
  );
};

export default TodoList;
