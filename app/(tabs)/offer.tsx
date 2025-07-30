import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { ProductRequest } from "@/types";
import { useProductsStore } from "@/store/productStore";
import Toast from "react-native-toast-message";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PostItemScreen() {
  const [photos, setPhotos] = useState<string[]>([]); // Array of URIs
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const { postProduct, loading, error } = useProductsStore();

  const pickImage = async () => {
    if (photos.length >= 5) {
      Alert.alert("Limit reached", "You can only upload up to 5 photos.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
    }
  };

  const handlePost = async () => {
    if (
      !title.trim() ||
      !category.trim() ||
      !price.trim() ||
      !description.trim() ||
      photos.length === 0
    ) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in all required fields and add at least one photo.",
      });
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert("Invalid Price", "Please enter a valid positive price.");
      return;
    }

    const productData: ProductRequest = {
      title: title.trim(),
      description: description.trim(),
      price: parsedPrice,
      category: category.trim(),
      image: photos[0], // Use the first photo as the main image
      // additionalImageUrl: photos.length > 1 ? photos[1] : undefined, // If backend ProductRequest expects single string
      // OR if your backend ProductRequest expects a list for additional images:
      additionalImageUrl: photos.length > 1 ? photos[1] : [], // Assuming your backend expects a single string for additional image for now
      // If backend expects List<String> for additionalImageUrl, you'd change the DTO and send:
      // additionalImageUrls: photos.slice(1), // Send remaining photos as additional
    };

    try {
      await postProduct(productData);

      Toast.show({
        type: "success",
        text1: "Item posted successfully",
      });

      // Clear the form after successful post
      setPhotos([]);
      setTitle("");
      setCategory("");
      setPrice("");
      setDescription("");
    } catch (err: any) {
      // Error handling is managed by Zustand, but show an alert for user feedback
      Alert.alert(
        "Error Posting",
        error || "Could not post item. Please try again."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Photos */}
      <Text style={styles.label}>Photos *</Text>
      <ScrollView horizontal style={styles.photosRow}>
        <TouchableOpacity
          style={styles.addPhotoBox}
          onPress={pickImage}
          disabled={loading}
        >
          <Ionicons name="camera-outline" size={30} color="#888" />
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </TouchableOpacity>
        {photos.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.photoThumbnail} />
        ))}
      </ScrollView>
      <Text style={styles.photoHint}>
        Add up to 5 photos. First photo will be the cover image.
      </Text>

      {/* Form Fields */}
      <Text style={styles.label}>Title *</Text>
      <TextInput
        placeholder="What are you selling?"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        editable={!loading}
      />

      <Text style={styles.label}>Category *</Text>
      <TextInput
        placeholder="Select a category"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        editable={!loading}
      />

      <Text style={styles.label}>Price *</Text>
      <TextInput
        placeholder="₵ 0.00"
        style={styles.input}
        value={price}
        keyboardType="decimal-pad"
        onChangeText={setPrice}
        editable={!loading}
      />

      <Text style={styles.label}>Description *</Text>
      <TextInput
        placeholder="Describe your item in detail..."
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.postButton, loading && styles.postButtonDisabled]}
        onPress={handlePost}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Text style={styles.postButtonText}>Post Item</Text>
        )}
      </TouchableOpacity>

      {/* Optionally display global error from store */}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  photosRow: {
    flexDirection: "row",
    marginVertical: 8,
  },
  addPhotoBox: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#aaa",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  addPhotoText: {
    fontSize: 10,
    color: "#888",
    marginTop: 4,
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  photoHint: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
  },
  postButton: {
    backgroundColor: "#00695c",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
  },
  postButtonDisabled: {
    backgroundColor: "#a7d7c6", // Lighter color when disabled
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
