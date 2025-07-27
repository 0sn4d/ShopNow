import AppColors from "@/assets/AppColors";
import { useFavoritesStore } from "@/store/favoriteStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = () => {
  const { favoriteItems } = useFavoritesStore();

  return (
    <View style={styles.searchRow}>
      <Ionicons name="search" size={20} color={"#00695c"} />
      <TouchableOpacity
        onPress={() => router.push("/search")}
        style={styles.searchInput}
      >
        <Text style={styles.searchInputText}>Search</Text>
      </TouchableOpacity>
      <Text style={styles.searchBrand} className="text-primary">
        ShopNow
      </Text>

      <TouchableOpacity
        style={styles.favButton}
        onPress={() => router.push("/(tabs)/favorites")}
      >
        <MaterialCommunityIcons
          name="heart-outline"
          size={20}
          color={AppColors.primary}
        />
        {favoriteItems.length > 0 && (
          <View style={styles.itemsView}>
            <Text style={styles.itemsText}>{favoriteItems.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    marginTop: 7,
    fontSize: 16,
    color: AppColors.text.descript,
    justifyContent: "center",
  },
  searchInputText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: AppColors.text.descript,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  searchBrand: {
    fontWeight: "bold",
    marginLeft: 4,
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
    borderColor: AppColors.status.error,
    backgroundColor: AppColors.status.error,
  },
  itemsText: {
    fontSize: 10,
    color: AppColors.text.secondary,
    fontWeight: 800,
  },
});
