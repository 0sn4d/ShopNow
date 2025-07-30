import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width;

// Example user object — you would replace this with real auth context or API response
const user = {
  isSeller: true, // Set this to false to test the alternate screen
};

const listings = [
  {
    id: "1",
    title: "iPhone 13 Pro Max",
    price: "₵5,599",
    views: 45,
    likes: 12,
    chats: 3,
  },
  {
    id: "2",
    title: "iPhone 13 Pro Max",
    price: "₵5,599",
    views: 45,
    likes: 12,
    chats: 3,
  },
];

export default function DashboardScreen() {
  if (!user.isSeller) {
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
      {listings.map((item) => (
        <View key={item.id} style={styles.listingCard}>
          <View style={styles.imagePlaceholder} />
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <View style={styles.metricsRow}>
              <Metric icon="eye-outline" value={item.views} />
              <Metric icon="heart-outline" value={item.likes} />
              <Metric icon="chatbubble-outline" value={item.chats} />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const Metric = ({ icon, value }) => (
  <View style={styles.metricItem}>
    <Ionicons name={icon} size={16} color="#999" />
    <Text style={styles.metricText}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
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
