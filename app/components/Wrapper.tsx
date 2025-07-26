import AppColors from "@/assets/AppColors";
import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView style={styles.safeView}>{children}</SafeAreaView>;
};

export default Wrapper;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: AppColors.background.tertiary,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
