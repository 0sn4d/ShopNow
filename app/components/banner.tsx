import AppColors from "@/assets/AppColors";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoadingSpinner from "./LoadingSpinner";

type Category = {
  id: number;
  name: string;
  image: string;
};

const Banner = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProducts, setShowProducts] = useState(false);
  const [swiping, setSwiping] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50;

  const fetchCategoriesWithImages = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const categoryNames: string[] = await res.json();

      const categoryData: Category[] = await Promise.all(
        categoryNames.map(async (cat, index) => {
          const productRes = await fetch(
            `https://fakestoreapi.com/products/category/${encodeURIComponent(
              cat
            )}`
          );
          const products = await productRes.json();
          return {
            id: index + 1,
            name: cat,
            image: products[0]?.image || "https://via.placeholder.com/250x150",
          };
        })
      );

      setCategories(categoryData);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const startAutoAdvance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!showProducts) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
      }, 5000);
    }
  };

  useEffect(() => {
    fetchCategoriesWithImages();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !showProducts) {
      startAutoAdvance();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [categories, showProducts]);

  const handleTouchStart = (e: any) => {
    setSwiping(false);
    if (showProducts) return;
    touchStartX.current = e.nativeEvent.pageX;
  };

  const handleTouchMove = (e: any) => {
    setSwiping(true);
    if (showProducts) return;
    touchEndX.current = e.nativeEvent.pageX;
  };

  const handleTouchEnd = () => {
    if (showProducts || !touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    } else if (distance < -minSwipeDistance) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + categories.length) % categories.length
      );
    }

    startAutoAdvance();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const currentCategory = categories[currentIndex];

  const navigateToCategory = (category: string) => {
    router.push({
      pathname: "/(tabs)/shop",
      params: {
        category: category,
      },
    });
  };

  return (
    <View
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Text style={styles.title}>Categories</Text>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (!swiping) {
            navigateToCategory(categories[currentIndex].name);
            setShowProducts(true);
          }
        }}
      >
        <View style={styles.card}>
          <Image source={{ uri: currentCategory.image }} style={styles.image} />
          <Text style={styles.name}>{currentCategory.name}</Text>

          {/* Dots */}
          <View style={styles.dotContainer}>
            {categories.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setCurrentIndex(index);
                  startAutoAdvance();
                }}
              >
                <View
                  style={[
                    styles.dot,
                    index === currentIndex && styles.activeDot,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.text.primary,
  },
  card: {
    marginTop: 5,
    marginBottom: 20,

    alignItems: "center",
    backgroundColor: AppColors.background.secondary,
    borderRadius: 12,
    width: "95%",
    height: 180,
    elevation: 3,
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 10,
    resizeMode: "contain",
  },
  name: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.text.primary,
  },

  dotContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    marginTop: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: "#ccc",
  },
  activeDot: {
    backgroundColor: "#00695c",
  },
});
