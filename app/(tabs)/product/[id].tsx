import BulletedList from "@/app/components/bulletedlist";
import Button from "@/app/components/button";
import CommonHeader from "@/app/components/commonHeader";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Rating from "@/app/components/rating";
import { getProduct } from "@/app/lib/api";
import AppColors from "@/assets/AppColors";
import { Product } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ProductWithImages = Product & { additionalImageUrl?: string[] };

const SingleProductScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<ProductWithImages | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    undefined
  );

  const additionalImage: { [key: number]: string[] } = {
    1: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=687&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=687&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560481979-f5b0174242a0?q=80&w=688&auto=format&fit=crop",
    ],
  };

  const safetytips = [
    "Make sure you meet in a public place",
    "Inspect the item before payment",
  ];

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const idNum = Number(id);
        const data = await getProduct(idNum);

        setProduct({
          ...data,
          additionalImageUrl: additionalImage[data.id] || [],
        });
        setCurrentImage(data.image);
      } catch (error) {
        setError("Failed to fetch product data");
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  const Images = [product?.image, ...(product?.additionalImageUrl ?? [])];
  const handleThumbnailClick = (Images: string) => {
    setCurrentImage(Images);
  };

  const handleMessage = () => {
    router.push("/messages");
  };

  const handleViewProfile = () => {
    router.push("/sellerprofie");
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <CommonHeader />
      {loading ? (
        <LoadingSpinner fullScreen />
      ) : error ? (
        <View style={styles.centerView}>
          <Text>{error}</Text>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={styles.imageView}>
              {currentImage && (
                <Image
                  source={{ uri: currentImage }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              )}
            </View>
            {/* Display Additional Images if they exist */}
            {Images.length > 0 && (
              <FlatList
                data={Images}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleThumbnailClick(item || "")}
                  >
                    <Image
                      source={{ uri: item || "" }}
                      style={[
                        styles.thumbnail,
                        item === currentImage && {
                          borderColor: AppColors.primary,
                          borderWidth: 2,
                        },
                      ]}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                style={styles.additionalImagesContainer}
              />
            )}

            <View style={styles.content}>
              <Text style={styles.category}>{product?.category}</Text>
              <Text style={styles.title}>{product?.title}</Text>
              <Rating
                rating={product?.rating.rate ?? 0}
                showCount={product?.rating.count}
                size={14}
              />
              <Text style={styles.price}>${product?.price.toFixed(2)}</Text>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{product?.description}</Text>

              <Text style={styles.sectionTitle}>Seller</Text>
              <View style={styles.sellerSection}>
                <View style={styles.placeholder} />
                <View style={{ flex: 1 }}>
                  <Text>Name</Text>
                  <Rating rating={0} showCount={0} />
                </View>
                <TouchableOpacity onPress={handleViewProfile}>
                  <Text style={styles.profileView}>View Profile</Text>
                </TouchableOpacity>
              </View>
              {/* Safety Tip */}
              <View style={styles.safetySection}>
                <View style={styles.safetyRow}>
                  <Ionicons name="shield-checkmark" size={18} color="#00695c" />
                  <Text style={styles.safetyText}>Safety Tips</Text>
                </View>
                <BulletedList
                  items={safetytips}
                  bulletStyle={{ color: AppColors.primary }}
                />
              </View>
              <View>
                <Text>Leave a review</Text>
              </View>
            </View>
          </ScrollView>
          <Button
            onPress={handleMessage}
            title="Message Seller"
            size="large"
            fullWidth={true}
            variant="primary"
            style={styles.msgbtn}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default SingleProductScreen;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: AppColors.background.tertiary,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  centerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageView: {
    width: "100%",
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: AppColors.background.tertiary,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 5,
    backgroundColor: AppColors.background.secondary,
    paddingBottom: 90,
  },

  category: {
    fontSize: 12,
    color: AppColors.text.placeholder,
    textTransform: "capitalize",
    marginTop: 4,
    marginBottom: 4,
  },
  additionalImagesContainer: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginLeft: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00695c",
    marginTop: 8,
    marginRight: 10,
    marginBottom: 12,
  },
  profileView: {
    color: "#00695c",
    fontWeight: "500",
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: AppColors.text.placeholder,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 3,
  },
  description: {
    fontSize: 14,
    color: AppColors.text.descript,
    marginBottom: 16,
    lineHeight: 20,
  },
  sellerSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  safetySection: {},
  safetyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 6,
  },
  safetyText: {
    fontSize: 14,
  },
  msgbtn: {
    bottom: 10,
    left: 5,
    alignItems: "center",
    zIndex: 10,
  },
});
