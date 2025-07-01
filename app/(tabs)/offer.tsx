import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default function PostItemScreen() {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const pickImage = async () => {
    if (photos.length >= 5) {
      Alert.alert('Limit reached', 'You can only upload up to 5 photos.');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 0.8,
    });

    if (!result.cancelled) {
      setPhotos([...photos, result.uri]);
    }
  };

  const handlePost = () => {
    Alert.alert('Posted!', 'Your item has been posted.');
    // Handle backend logic here
  };

  return (
    <ScrollView style={styles.container}>
      {/* Photos */}
      <Text style={styles.label}>Photos *</Text>
      <ScrollView horizontal style={styles.photosRow}>
        <TouchableOpacity style={styles.addPhotoBox} onPress={pickImage}>
          <Ionicons name="camera-outline" size={30} color="#888" />
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </TouchableOpacity>
        {photos.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.photoThumbnail} />
        ))}
      </ScrollView>
      <Text style={styles.photoHint}>Add up to 5 photos. First photo will be the cover image.</Text>

      {/* Form Fields */}
      <Text style={styles.label}>Title *</Text>
      <TextInput
        placeholder="What are you selling?"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Category *</Text>
      <TextInput
        placeholder="Select a category"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Condition</Text>
      <TextInput
        placeholder="Select a condition"
        style={styles.input}
        value={condition}
        onChangeText={setCondition}
      />

      <Text style={styles.label}>Price *</Text>
      <TextInput
        placeholder="₵ 0.00"
        style={styles.input}
        value={price}
        keyboardType="decimal-pad"
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Description *</Text>
      <TextInput
        placeholder="Describe your item in detail..."
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
      />

      <Text style={styles.label}>Location *</Text>
      <TextInput
        placeholder="City, State"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post Item</Text>
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  photosRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  addPhotoBox: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  addPhotoText: {
    fontSize: 10,
    color: '#888',
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
    color: '#777',
    marginBottom: 4,
  },
  postButton: {
    backgroundColor: '#00695c',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
