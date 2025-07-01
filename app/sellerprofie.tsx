import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SellerProfileScreen() {
  const listings = [
    { id: '1', title: 'MacBook Air M2', price: '$1,099' },
    { id: '2', title: 'MacBook Air M2', price: '$1,099' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.profileCard}>
        <View style={styles.headerRow}>
          <View style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.name}>Gyabs</Text>
            <Text style={styles.rating}>
              ⭐ 4.8 <Text style={styles.subText}>(23 reviews)</Text>
            </Text>
            <View style={styles.locationRow}>
              <Entypo name="location-pin" size={14} color="#555" />
              <Text style={styles.subText}>KNUST Commercial Area</Text>
            </View>
            <View style={styles.memberRow}>
              <MaterialIcons name="calendar-today" size={14} color="#555" />
              <Text style={styles.subText}>Member since Jan 2023</Text>
            </View>
          </View>
        </View>

        {/* Badges */}
        <View style={styles.badgeRow}>
          <Badge label="Verified Seller" />
          <Badge label="Fast Shipper" />
          <Badge label="Top Rated" />
        </View>

        <Text style={styles.bio}>
          Tech enthusiast selling quality electronics and gadgets. All items
          are tested and described accurately. Quick shipping and excellent
          customer service!
        </Text>

        {/* Metrics */}
        <View style={styles.metricsRow}>
          <Metric title="Total Sales" value="47" />
          <Metric title="Active Items" value="8" />
          <Metric title="Response Rate" value="98%" />
        </View>

        {/* Response time */}
        <View style={styles.responseRow}>
          <Ionicons name="shield-checkmark" size={16} color="#00695c" />
          <Text style={styles.responseText}>Usually responds within 1 hour</Text>
        </View>
      </View>

      {/* Listings */}
      <Text style={styles.listingsTitle}>Current Listings</Text>
      <FlatList
        horizontal
        data={listings}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        renderItem={({ item }) => (
          <View style={styles.listingCard}>
            <View style={styles.imagePlaceholder} />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        )}
      />

      {/* Message Button */}
      <TouchableOpacity style={styles.messageButton}>
        <Text style={styles.messageButtonText}>Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const Badge = ({ label }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{label}</Text>
  </View>
);

const Metric = ({ title, value }) => (
  <View style={styles.metricBox}>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{title}</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 70,
    height: 70,
    backgroundColor: '#ccc',
    borderRadius: 35,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  rating: {
    marginTop: 2,
    color: '#333',
  },
  subText: {
    color: '#666',
    fontSize: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 10,
  },
  badge: {
    backgroundColor: '#d0f0e4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    color: '#00695c',
    fontWeight: '500',
  },
  bio: {
    fontSize: 14,
    color: '#444',
    marginTop: 10,
    lineHeight: 20,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 12,
  },
  metricBox: {
    alignItems: 'center',
  },
  metricValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
  },
  responseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  responseText: {
    color: '#00695c',
    fontSize: 13,
  },
  listingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  listingCard: {
    width: 140,
    marginRight: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 90,
    backgroundColor: '#ddd',
    borderRadius: 6,
    marginBottom: 6,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#00695c',
    fontWeight: '600',
    marginTop: 2,
  },
  messageButton: {
    backgroundColor: '#00695c',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
