import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { IconWrapperProps } from "./interface";

const IconWrapper: React.FC<IconWrapperProps> = ({
  name,
  variant,
  size,
  color,
  onPress,
  ...props
}) => {
  let IconComponent;
  const { style } = props;
  const spreadableProps = {
    className: style,
  };

  // Determine which icon component to use based on the variant prop
  switch (variant) {
    case "Ionicons":
      IconComponent = Ionicons;
      break;
    case "MaterialIcons":
      IconComponent = MaterialIcons;
      break;
    case "FontAwesome":
      IconComponent = FontAwesome;
      break;
    default:
      IconComponent = Ionicons; // Fallback to Ionicons if no variant is provided
  }

  // Render the icon component with or without the TouchableOpacity based on the onPress prop
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <IconComponent
          name={name}
          size={size}
          color={color}
          {...spreadableProps}
        />
      </TouchableOpacity>
    );
  }

  return (
    <IconComponent name={name} size={size} color={color} {...spreadableProps} />
  );
};

export default IconWrapper;
