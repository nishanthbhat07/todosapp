import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import CheckBox from "react-native-check-box";
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import IconWrapper from "../icon";
import { colors } from "../../contants/colors";

const Card: React.FC<{
  deleteTodos: (id: number) => () => void;
  updateTodos: (id: number, todos: Record<string, string>) => () => void;
  toggleTodos: (id: number, completed: boolean) => () => void;
  item: {
    id: number;
    title: string;
    completed: boolean;
  };
}> = ({
  item: { title, id, completed },
  deleteTodos,
  toggleTodos,
  updateTodos,
}) => {
  const translateX = useSharedValue(300);

  const [edit, setEdit] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);

  useEffect(() => {
    translateX.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const toggleAndRunAnimation = () => {
    // runCompletedAnimation();
    toggleTodos(id, !completed)();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const handleUpdateTodo = () => {
    updateTodos(id, { title: todoTitle })();
    setEdit((prev) => !prev);
  };

  return (
    <Animated.View
      entering={FadeInDown}
      style={animatedStyle}
      className="bg-white p-[5%] shadow shadow-backdrop rounded-[5] m-[10px]  flex-row justify-between items-center"
    >
      <View className="flex-row items-center gap-[10]">
        <CheckBox
          checkBoxColor={colors.primaryColor}
          isChecked={completed}
          onClick={toggleAndRunAnimation}
          checkedCheckBoxColor={colors.primaryColor}
        />
        {!edit && (
          <Text
            numberOfLines={2}
            lineBreakMode="tail"
            className={`${completed && "line-through"} decoration-textColorPrimary text-textColorPrimary max-w-[180px] text-[15px]`}
          >
            {title}
          </Text>
        )}
        {edit && (
          <TextInput
            value={todoTitle}
            onChangeText={(val) => setTodoTitle(val)}
            className="border max-w-[180px] border-gray-300 p-[2%] rounded"
          />
        )}
      </View>
      <View className="flex-row gap-5">
        <IconWrapper
          onPress={handleUpdateTodo}
          name={edit ? "check" : "edit"}
          variant="MaterialIcons"
          size={24}
          color={colors.primaryColor}
        />
        <IconWrapper
          onPress={deleteTodos(id)}
          name="delete"
          variant="MaterialIcons"
          size={24}
          color={colors.errorColor}
        />
      </View>
    </Animated.View>
  );
};

export default Card;
