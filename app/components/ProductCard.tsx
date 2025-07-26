import AppColors from "@/assets/AppColors";
import { Product } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Toast from "react-native-toast-message";
import Button from "./button";
import Rating from "./rating";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  customStyle?: StyleProp<ViewStyle>;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  compact = false,
  customStyle,
}) => {
  const { id, title, price, image, category, rating } = product;
  const router = useRouter();
  const handleProductRoute = () => {
    router.push(`/product/${id}`);
  };

  /*const handleAddToCart = () => {
    Toast.show({
      type: "success",
      text1: "Message Seller",
      text2: "Api call",
      visibilityTime: 2000,
    });
  };*/

  const handleMessage = () => {
    Toast.show({
      type: "success",
      text1: "Message Seller",
      text2: "Api call",
      visibilityTime: 2000,
    });
  };

  return (
    <TouchableOpacity
      onPress={handleProductRoute}
      style={[styles.card, compact && styles.compactCard, customStyle]}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>

        <Text
          style={styles.title}
          numberOfLines={compact ? 1 : 2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.price, !compact && { marginBottom: 7 }]}>
            ${price.toFixed(2)}
          </Text>

          <View>
            <Rating rating={product.rating.rate} />
            <Text style={[styles.ratingText, !compact && { marginBottom: 7 }]}>
              {rating?.rate.toFixed(1)}({rating.count} reviews)
            </Text>
          </View>
          {!compact && (
            <Button
              onPress={handleMessage}
              title="Message Seller"
              size="small"
              variant="primary"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.background.secondary,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
    width: "48%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AppColors.background.secondary,
  },
  compactCard: {
    width: 150,
    marginRight: 12,
  },
  imageContainer: {
    position: "relative",
    height: 150,
    backgroundColor: AppColors.background.tertiary,
    padding: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderColor: AppColors.status.warning,
  },
  content: {
    padding: 12,
    backgroundColor: AppColors.background.secondary,
  },
  category: {
    fontSize: 12,
    color: AppColors.text.placeholder,
    textTransform: "capitalize",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: AppColors.text.primary[600],
    marginBottom: 8,
  },
  footer: {
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.primary,
  },
  ratingText: {
    textTransform: "capitalize",
    color: AppColors.text.placeholder,
    fontSize: 12,
  },
});
