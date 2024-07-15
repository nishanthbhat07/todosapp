import { FlatList, LogBox, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import Toast from "react-native-toast-message";
import { remapProps } from "nativewind";
import ReplicacheProvider from "../src/contexts/replicache";

const queryClient = new QueryClient();
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

LogBox.ignoreAllLogs();
remapProps(FlatList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});
const AppLayout = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView className="bg-red">
        <QueryClientProvider client={queryClient}>
          <ReplicacheProvider>
            {/* <Stack screenOptions={{ headerShown: false }} /> */}
            <Slot />
          </ReplicacheProvider>
        </QueryClientProvider>
        <Toast position="bottom" bottomOffset={120} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default AppLayout;
