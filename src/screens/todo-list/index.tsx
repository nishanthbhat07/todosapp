import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSubscribe } from "replicache-react";
import { ReadTransaction } from "replicache";
import Card from "../../components/card";
import { useReplicache } from "../../contexts/replicache";

const TodoList = () => {
  const { replicacheInstance } = useReplicache();
  const todos = useSubscribe(
    replicacheInstance,
    async (tx: ReadTransaction) => {
      const list = await tx.scan().values().toArray();
      return list;
    },
    [],
    [replicacheInstance],
  );

  todos.sort((a, b) => a.sort - b.sort);
  const [todoName, setTodoName] = useState("");

  const deleteTodos = (id: number) => {
    return async () => {
      await replicacheInstance.mutate.deleteTodo({
        id,
      });
    };
  };

  const addTodos = async () => {
    await replicacheInstance.mutate.createTodo({
      id: new Date().toISOString(),
      completed: false,
      title: todoName.trim(),
    });
  };

  return (
    <View>
      <View className="flex flex-row justify-evenly space-x-2 p-[10px] my-[10%] items-center">
        <TextInput
          onChangeText={(val) => setTodoName(val)}
          placeholder="Add a new task"
          placeholderTextColor="grey"
          className="w-[80%] p-[2%] rounded-[5] border border-[black]"
        />
        <TouchableOpacity
          onPress={addTodos}
          activeOpacity={0.65}
          className="px-[4%] py-[2%] text-center rounded-[5] bg-primaryColor"
        >
          <Text className="text-white font-medium">Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={todos}
        renderItem={({ item }) => (
          <Card item={item} deleteTodos={deleteTodos} />
        )}
      />
    </View>
  );
};

export default TodoList;
