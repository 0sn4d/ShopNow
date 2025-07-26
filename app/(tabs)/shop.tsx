import AppColors from "@/assets/AppColors";
import { useProductsStore } from "@/store/productStore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
const API_URL = "https://fakestoreapi.com";

const shop = () => {
  const { q: searchParam, category: categoryParam } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [showSortModal, setShowSortModal] = useState(false);
  const [activeSortOption, setActiveSortOption] = useState<string | null>(null);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const {
    filteredProducts,
    selectedCategory,
    loading,
    error,
    fetchProducts,
    setCategory,
    sortProducts,
  } = useProductsStore();
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  const fetchCategories = async () => {
    const response = await fetch(`${API_URL}/products/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    if (categoryParam) {
      if (typeof categoryParam === "string") {
        setCategory(categoryParam);
      } else if (Array.isArray(categoryParam) && categoryParam.length > 0) {
        setCategory(categoryParam[0]);
      }
    }
  }, []);

  const renderHeader = () => {
    return (
      <View>
        <Text style={styles.header}>All Products</Text>
        <View style={styles.searchRow}>
          <TouchableOpacity onPress={() => router.push("/search")}>
            <Ionicons name="search" size={20} color={"#00695c"} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search "
            placeholderTextColor={"#888"}
            style={styles.searchInput}
          />

          <Text style={styles.searchBrand} className="text-primary">
            ShopNow
          </Text>
          <TouchableOpacity
            onPress={() => setShowSortModal(true)}
            style={styles.filterIcon}
          >
            <Ionicons
              name={isFilterActive ? "funnel" : "funnel-outline"}
              size={22}
              color={"#00695c"}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <TouchableOpacity
            onPress={() => setCategory(null)}
            style={[
              styles.categoryButton,
              selectedCategory === null && styles.selectedCategory,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === null && styles.selectedText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {categories?.map((category) => (
            <TouchableOpacity
              onPress={() => setCategory(category)}
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedText,
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  //if (error) {
  //  return (
  //  <View style={styles.safeView}>
  //  <Text>Error: {error}</Text>
  //</View>
  //);
  //}

  const handleSort = (sortBy: "price-asc" | "price-desc" | "rating") => {
    sortProducts(sortBy);
    setActiveSortOption(sortBy);
    setShowSortModal(false);
    setIsFilterActive(true);
  };
  const handleResetFilter = () => {
    sortProducts("");
    setActiveSortOption(null);
    setShowSortModal(false);
    setIsFilterActive(false);
  };
  return (
    <View style={styles.safeView}>
      {renderHeader()}
      {loading ? (
        <LoadingSpinner fullScreen />
      ) : filteredProducts?.length === 0 ? (
        <EmptyState type="search" message="No products found" />
      ) : (
        <FlatList
          data={filteredProducts}
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
      )}
      <Modal
        visible={showSortModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSortModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => setShowSortModal(false)}>
                <AntDesign
                  name="close"
                  size={24}
                  color={AppColors.text.placeholder}
                  onPress={() => setShowSortModal(false)}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.sortOption,
                activeSortOption === "price-asc" && styles.activeSortButton,
              ]}
              onPress={() => handleSort("price-asc")}
            >
              <Text style={styles.sortOptionText}>Price: Low to High</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortOption,
                activeSortOption === "price-desc" && styles.activeSortButton,
              ]}
              onPress={() => handleSort("price-desc")}
            >
              <Text style={styles.sortOptionText}>Price: High to Low</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortOption,
                activeSortOption === "rating" && styles.activeSortButton,
              ]}
              onPress={() => handleSort("rating")}
            >
              <Text style={styles.sortOptionText}>Highest Rated</Text>
            </TouchableOpacity>
            {isFilterActive && (
              <TouchableOpacity
                onPress={handleResetFilter}
                style={styles.sortOption}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    { color: AppColors.status.error },
                  ]}
                >
                  Reset Filter
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default shop;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: AppColors.background.tertiary,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  header: {
    paddingBottom: 16,
    backgroundColor: AppColors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border.dark,
    fontSize: 20,
    paddingHorizontal: 16,
    fontWeight: "bold",
  },
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
    fontSize: 16,
    color: "#333",
  },
  searchBrand: {
    fontWeight: "bold",
    marginLeft: 4,
  },
  filterIcon: {
    borderWidth: 1,
    borderColor: AppColors.background.secondary,
    marginLeft: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: AppColors.background.tertiary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: AppColors.text.primary,
  },
  sortOption: {
    borderWidth: 1,
    borderColor: AppColors.text.secondary,
    width: "auto",
    height: 45,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeSortOption: {
    backgroundColor: AppColors.background.secondary,
  },
  sortOptionText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: AppColors.text.primary,
  },
  activeSortButton: {
    borderWidth: 1,
    borderColor: AppColors.text.placeholder,
  },
});
