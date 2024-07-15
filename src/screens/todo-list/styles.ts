import { StyleSheet } from "react-native";
import { colors } from "../../contants/colors";

export default StyleSheet.create({
  dropdown: {
    borderColor: colors.textColorPrimary,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  placeholderStyle: {
    color: colors.textColorSecondary,
    fontSize: 14,
  },
  selectedTextStyle: {
    color: colors.primaryColor,
    fontSize: 14,
  },
});
