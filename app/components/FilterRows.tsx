import AppColors from "@/assets/AppColors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FilterRows = () => {
  const route = useRoute();
  const navigate = useNavigation();

  return (
    <View style={styles.Row}>
      <Ionicons name="location" size={18} color={AppColors.primary} />

      <TouchableOpacity
        style={styles.favButton}
        onPress={() => router.push("/(tabs)/favorites")}
      >
        <MaterialCommunityIcons
          name="heart-outline"
          size={20}
          color={AppColors.primary}
        />
        <View style={styles.itemsView}>
          <Text style={styles.itemsText}>0</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FilterRows;

const styles = StyleSheet.create({
  Row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 10,
  },
  favButton: {
    backgroundColor: AppColors.background.secondary,
    borderRadius: 5,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    borderWidth: 1,
    borderColor: AppColors.primary,
    position: "relative",
  },
  itemsView: {
    position: "absolute",
    top: -5,
    right: -5,
    borderRadius: 50,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: AppColors.primary[500],
    backgroundColor: AppColors.background.secondary,
  },
  itemsText: {
    fontSize: 10,
    color: AppColors.text.primary,
    fontWeight: 800,
  },
});
