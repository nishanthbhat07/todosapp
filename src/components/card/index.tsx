import { View, Text } from "react-native";
import React from "react";
import IconWrapper from "../icon";

const Card: React.FC<{
  deleteTodos: (id: number) => () => void;
  item: {
    id: number;
    title: string;
  };
}> = ({ item: { title, id }, deleteTodos }) => {
  return (
    <View className="bg-white p-[3%] rounded-[5] m-[10px] border flex-row justify-between items-center">
      <Text>{title}</Text>
      <IconWrapper
        onPress={deleteTodos(id)}
        name="delete"
        variant="MaterialIcons"
        size={24}
        color="black"
      />
    </View>
  );
};

export default Card;
