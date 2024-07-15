import Toast, { ToastShowParams } from "react-native-toast-message";

export const showToast = (props: ToastShowParams) => {
  Toast.show({
    ...props,
  });
};
