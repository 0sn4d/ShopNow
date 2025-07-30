import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "../lib/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import { Product } from "@/types";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen({ sellerId }: { sellerId: number }) {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://${BACKEND_URL}/api/products/seller/${sellerId}/products`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching seller products", err));
  }, [sellerId]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You’re not selling anything yet.</Text>
        <TouchableOpacity
          style={styles.sellButton}
          onPress={() => router.push("/(tabs)/offer")}
        >
          <Text style={styles.sellButtonText}>Post an Item</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Earnings Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total Earnings</Text>
          <Text style={styles.earnings}>₵0.00</Text>
          <Text style={styles.growth}>+00% month over month</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Active Listings</Text>
          <Text style={styles.listingCount}>{listings.length}</Text>
          <Text style={styles.growth}>+1% month over month</Text>
        </View>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Earnings</Text>
        <LineChart
          data={{
            labels: ["23", "24", "25", "26", "27", "28", "29", "30"],
            datasets: [
              {
                data: [29000, 30500, 34000, 37000, 39000, 41000, 43000, 47000],
              },
            ],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisSuffix="K"
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: () => "#00695c",
            labelColor: () => "#999",
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#00695c",
            },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </View>

      {/* Listings */}
      <Text style={styles.listingsTitle}>Your Listings</Text>
      <View style={styles.productsGrid}>
        {listings?.map((product) => (
          <View key={product?.id} style={styles.productContainer}>
            <ProductCard product={product} customStyle={{ width: "100%" }} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const Metric = ({ icon, value }) => (
  <View style={styles.metricItem}>
    <Ionicons name={icon} size={16} color="#999" />
    <Text style={styles.metricText}>{value}</Text>
  </View>
);

// Styles unchanged — omitted for brevity

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
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
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryBox: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#777",
  },
  earnings: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00695c",
  },
  listingCount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00695c",
  },
  featuredProductsContainer: {},
  featuredProductContainer: {
    // marginHorizontal: 8,
  },
  growth: {
    fontSize: 12,
    color: "#4caf50",
    marginTop: 4,
  },
  chartContainer: {
    marginTop: 24,
    backgroundColor: "#fff",
    paddingVertical: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  listingsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 28,
    marginBottom: 8,
  },
  listingCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#ddd",
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemPrice: {
    color: "#00695c",
    fontWeight: "500",
    marginVertical: 4,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 12,
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  metricText: {
    marginLeft: 4,
    color: "#999",
    fontSize: 12,
  },

  // Empty seller state styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  sellButton: {
    backgroundColor: "#00695c",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  sellButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
