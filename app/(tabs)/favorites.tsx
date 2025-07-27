import AppColors from "@/assets/AppColors";
import { useFavoritesStore } from "@/store/favoriteStore";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

const favorites = () => {
  const router = useRouter();
  const { favoriteItems, resetFavorite } = useFavoritesStore();

  const navigateToProducts = () => {
    router.push("/(tabs)/shop");
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {favoriteItems?.length > 0 ? (
        <>
          <View style={styles.headerView}>
            <View>
              <Text style={styles.title}>Favourite Products</Text>
              <Text style={styles.itemCount}>
                {favoriteItems?.length} items
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={resetFavorite}>
                <Text style={styles.resetText}>Reset Favourite</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={favoriteItems}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <ProductCard product={item} customStyle={{ width: "100%" }} />
              </View>
            )}
            contentContainerStyle={styles.productsGrid}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<View style={styles.footer} />}
          />
        </>
      ) : (
        <EmptyState
          type="favorites"
          message="You haven't added any favorites yet"
          actionLabel="Browse Products"
          onAction={navigateToProducts}
        />
      )}
    </View>
  );
};

export default favorites;

const styles = StyleSheet.create({
  headerView: {
    marginTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 16,
    backgroundColor: AppColors.background.tertiary,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.text.descript,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  resetText: {
    color: AppColors.status.error,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: AppColors.text.primary,
  },
  itemCount: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: AppColors.text.placeholder,
    marginTop: 2,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  footer: {
    height: 100,
  },
  emptyStateContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: AppColors.text.placeholder,
    textAlign: "center",
    lineHeight: 24,
  },
  productContainer: {
    width: "48%",
  },
  productsGrid: {
    paddingHorizontal: 5,
    paddingTop: 16,
    paddingBottom: 50,
  },
});
