import { GestureResponderEvent } from "react-native";

export interface IconWrapperProps {
  name: string;
  variant: "Ionicons" | "MaterialIcons" | "FontAwesome";
  size: number;
  color: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: string;
}
