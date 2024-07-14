import { LogBox, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import ReplicacheProvider from "../src/contexts/replicache";

const queryClient = new QueryClient();
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

LogBox.ignoreAllLogs();
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
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default AppLayout;
