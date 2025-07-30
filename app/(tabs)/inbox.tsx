import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Mock data for recent chats
const recentChats = [
  {
    id: "1",
    name: "Alice",
    lastMessage: "That's what's up!",
  },
  {
    id: "2",
    name: "Bob",
    lastMessage: "Let’s meet at 5.",
  },
  {
    id: "3",
    name: "Charlie",
    lastMessage: "On my way!",
  },
];

export default function HomeScreen() {
  const renderItem = ({ item }: { item: (typeof recentChats)[0] }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => router.push("/messages")}
    >
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Messages"
        placeholderTextColor="#888"
      />
      <FlatList
        data={recentChats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", paddingTop: 40 },
  header: { fontSize: 24, fontWeight: "bold", padding: 16 },
  list: { paddingHorizontal: 16 },
  chatItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  chatInfo: {},
  chatName: { fontSize: 18, fontWeight: "bold" },
  chatMessage: { fontSize: 14, color: "#555", marginTop: 4 },
  searchInput: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: "white",
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
});
