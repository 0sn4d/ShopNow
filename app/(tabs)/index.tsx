import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  // Dummy data (no images, just labels and keys)
  const categories = [
    { id: '1', label: 'Pears' },
    { id: '2', label: 'Watermelon' },
    { id: '3', label: 'Tangerine' },
    { id: '4', label: 'Mushroom' },
  ];

  const bestDeals = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search "
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
        <Text style={styles.searchBrand}>ShopNow</Text>
        <TouchableOpacity style={styles.gridIcon}>
          <Ionicons name="grid-outline" size={22} color="#00695c" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <Ionicons name="location-outline" size={18} color="#00695c" />
        <View style={styles.tabContainer}>
          <Text style={[styles.tab, styles.tabActive]}>All</Text>
          <Text style={styles.tab}>Pickup</Text>
          <Text style={styles.tab}>Shipping</Text>
        </View>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        {/* You can manually insert image here */}
        <Text style={styles.bannerText}>Fruits & Veggies</Text>
      </View>

      {/* Fruits and Veggies */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Fruits and Veggies</Text>
        <Text style={styles.sectionLink}>&gt;</Text>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <View style={styles.imagePlaceholder} />
            <Text style={styles.categoryLabel}>{item.label}</Text>
          </View>
        )}
      />

      {/* Best Deals */}
      <Text style={[styles.sectionTitle, { marginTop: 20, marginLeft: 16 }]}>
        Best Deals
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={bestDeals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={() => (
          <View style={styles.dealItem}>
            <View style={styles.imagePlaceholder} />
          </View>
        )}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  searchBrand: {
    fontWeight: 'bold',
    color: '#00695c',
    marginLeft: 4,
  },
  gridIcon: {
    marginLeft: 10,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  tab: {
    marginRight: 16,
    color: '#888',
    fontSize: 16,
  },
  tabActive: {
    color: '#00695c',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#00695c',
  },
  banner: {
    marginTop: 16,
    marginHorizontal: 16,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00695c',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 20,
  },
  sectionLink: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00695c',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ddd',
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 13,
    color: '#333',
  },
  dealItem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginRight: 16,
  },
});
