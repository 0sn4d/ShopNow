import { useProductsStore } from "@/store/productStore";
import { Product } from "@/types";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppColors from "../../assets/AppColors"; // Adjust the path as necessary
import Banner from "../components/banner";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";

const HomeScreen = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const {
    products,
    categories,
    filteredProducts,
    loading,
    error,
    fetchProducts,
    fetchCategories,
  } = useProductsStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const reverseProducts = [...products].reverse();
      setFeaturedProducts(reverseProducts as Product[]);
    }
  }, [products]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeView}>
        <StatusBar
          backgroundColor={AppColors.background.primary}
          barStyle={"light-content"}
        />
        <View style={styles.errorContainer}>
          <Text className="AppColors.text.error">Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar
        backgroundColor={AppColors.background.primary}
        barStyle={"light-content"}
      />
      <Header />

      <View style={styles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainerView}
        >
          <Banner />
          {/* Featured Products */}
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Products</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={featuredProducts}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredProductsContainer}
              renderItem={({ item }) => (
                <View style={styles.featuredProductContainer}>
                  <ProductCard product={item} compact />
                </View>
              )}
            />
          </View>
          {/* Newest Products */}
          <View style={styles.newestSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Newest Arrivals</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.productsGrid}>
              {products?.map((product) => (
                <View key={product?.id} style={styles.productContainer}>
                  <ProductCard
                    product={product}
                    customStyle={{ width: "100%" }}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: AppColors.background.tertiary,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  container: {
    flex: 1,
    backgroundColor: AppColors.background.secondary,
  },

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  contentContainer: {
    // paddingHorizontal: 20,
    paddingLeft: 20,
  },
  scrollContainerView: {
    paddingBottom: 300,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingRight: 20,
  },
  sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontWeight: "bold",
    fontSize: 18,
    color: AppColors.text.primary,
  },
  seeAllText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: AppColors.primary[500],
  },
  featuredSection: {
    marginVertical: 16,
  },
  featuredProductsContainer: {},
  featuredProductContainer: {
    // marginHorizontal: 8,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  productContainer: {
    width: "48%",
  },
  newestSection: {
    marginVertical: 16,
    marginBottom: 32,
  },
});
