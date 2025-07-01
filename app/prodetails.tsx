import { Entypo, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ProductDetailScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Main Image Placeholder */}
      <View style={styles.imagePlaceholder} />

      {/* Small Thumbnails (3 placeholders) */}
      <View style={styles.thumbnailRow}>
        {[1, 2, 3].map((_, index) => (
          <View key={index} style={styles.thumbnail} />
        ))}
      </View>

      {/* Product Title and Price */}
      <Text style={styles.title}>iPhone 14 Pro Max - Excellent Condition</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>₵899</Text>
        <Text style={styles.oldPrice}>₵1,100</Text>
      </View>

      {/* Location and Time */}
      <View style={styles.metaRow}>
        <Entypo name="location-pin" size={14} color="#555" />
        <Text style={styles.metaText}>KNUST Commercial Area</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.metaText}>2 days ago</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        This iPhone 14 Pro Max is in excellent condition with minimal signs of
        use. Always kept in a case with screen protector. Battery health is 92%.
        Includes original box, charger, and unused EarPods.
      </Text>

      {/* Specs */}
      <Text style={styles.sectionTitle}>Specifications</Text>
      <View style={styles.specRow}>
        <Text style={styles.specLabel}>Storage</Text>
        <Text style={styles.specValue}>256GB</Text>
      </View>
      <View style={styles.specRow}>
        <Text style={styles.specLabel}>Color</Text>
        <Text style={styles.specValue}>Deep Purple</Text>
      </View>
      <View style={styles.specRow}>
        <Text style={styles.specLabel}>Condition</Text>
        <Text style={styles.specValue}>Excellent</Text>
      </View>
      <View style={styles.specRow}>
        <Text style={styles.specLabel}>Battery Health</Text>
        <Text style={styles.specValue}>92%</Text>
      </View>

      {/* Seller Info */}
      <Text style={styles.sectionTitle}>Seller</Text>
      <View style={styles.sellerRow}>
        <View style={styles.avatarPlaceholder} />
        <View style={{ flex: 1 }}>
          <Text style={styles.sellerName}>Gyabs</Text>
          <Text style={styles.sellerRating}>⭐ 4.8 (23 reviews)</Text>
          <Text style={styles.sellerResponse}>Usually responds within 1 hour</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewProfile}>View Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Safety Tip */}
      <View style={styles.safetyRow}>
        <Ionicons name="shield-checkmark" size={18} color="#00695c" />
        <Text style={styles.safetyText}>Safety Tips</Text>
      </View>

      {/* Message Button */}
      <TouchableOpacity style={styles.messageButton}>
        <Text style={styles.messageButtonText}>Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  imagePlaceholder: {
    height: 220,
    borderRadius: 12,
    backgroundColor: '#ddd',
    marginBottom: 12,
  },
  thumbnailRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00695c',
    marginRight: 10,
  },
  oldPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#555',
  },
  dot: {
    fontSize: 14,
    marginHorizontal: 6,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 12,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  specLabel: {
    color: '#666',
    fontSize: 14,
  },
  specValue: {
    color: '#111',
    fontWeight: '500',
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  sellerName: {
    fontWeight: '600',
  },
  sellerRating: {
    fontSize: 13,
    color: '#444',
  },
  sellerResponse: {
    fontSize: 12,
    color: '#777',
  },
  viewProfile: {
    color: '#00695c',
    fontWeight: '500',
  },
  safetyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  safetyText: {
    color: '#00695c',
    fontSize: 14,
  },
  messageButton: {
    backgroundColor: '#00695c',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
