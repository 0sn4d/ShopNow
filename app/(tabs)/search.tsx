import AppColors from "@/assets/AppColors";
import { useProductsStore } from "@/store/productStore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import Wrapper from "../components/Wrapper";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const searchTimeoutRef = useRef<number | null>(null);
  const {
    filteredProducts,
    selectedCategory,
    loading,
    error,
    fetchProducts,
    setCategory,
    sortProducts,
    searchProductsRealTime,
  } = useProductsStore();

  useEffect(() => {
    if (filteredProducts?.length === 0) {
      fetchProducts();
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (text.length === 3) {
      searchTimeoutRef.current = setTimeout(() => {
        searchProductsRealTime(text);
      }, 500);
    } else {
      searchProductsRealTime("");
    }
  };

  const handleClearChange = () => {
    setSearchQuery("");
    searchProductsRealTime("");
  };
  const renderHeader = () => {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Search Products</Text>
        </View>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Search "
                placeholderTextColor={"#888"}
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={handleSearchChange}
              />
              {searchQuery?.length > 0 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={handleClearChange}
                >
                  <AntDesign
                    name="close"
                    size={16}
                    color={AppColors.text.placeholder}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => searchProductsRealTime(searchQuery)}
          >
            <Ionicons
              name="search"
              size={20}
              color={AppColors.text.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Wrapper>
      {renderHeader()}
      {loading ? (
        <LoadingSpinner fullScreen />
      ) : error ? (
        <View>
          <Text>{error}</Text>
        </View>
      ) : filteredProducts.length === 0 && searchQuery ? (
        <EmptyState type="search" message="No product found" />
      ) : (
        <FlatList
          data={searchQuery ? filteredProducts : []}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <ProductCard product={item} customStyle={{ width: "100%" }} />
            </View>
          )}
          contentContainerStyle={styles.productsGrid}
          columnWrapperStyle={styles.columnWrapper}
          ListFooterComponent={<View style={styles.footer} />}
          ListEmptyComponent={
            !searchQuery ? (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>
                  Type at least 3 characters to search products
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </Wrapper>
  );
};

export default search;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: AppColors.background.tertiary,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  header: {
    paddingBottom: 10,
    backgroundColor: AppColors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border.dark,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: AppColors.text.tertiary,
    paddingTop: 8,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,

    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: AppColors.text.tertiary,
    paddingRight: 44,
  },
  searchInputStyle: {
    backgroundColor: AppColors.text.placeholder,
    paddingRight: 40,
    borderRadius: 8,
    borderColor: "transparent",
  },
  searchButton: {
    backgroundColor: AppColors.primary,
    borderRadius: 8,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  searchContainer: {
    flex: 1,
  },
  clearButton: {
    padding: 12,
  },
  categoriesContainer: {
    paddingVertical: 8,
    marginHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: AppColors.background.secondary,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: AppColors.background.primary,
  },
  categoryText: {
    color: AppColors.text.primary,
  },
  selectedText: {
    color: AppColors.text.secondary,
  },
  productsGrid: {
    paddingHorizontal: 5,
    paddingTop: 16,
    paddingBottom: 50,
  },
  productContainer: {
    width: "48%",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  footer: {
    height: 100,
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
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
});
