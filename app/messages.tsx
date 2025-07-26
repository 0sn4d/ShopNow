import React, { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi, is this still available?", sent: false },
    { id: "2", text: "Yes, it is! 😊", sent: true },
  ]);
  const [input, setInput] = useState("");
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sent: true,
    };
    setMessages([...messages, newMessage]);
    setInput("");

    // Auto-scroll to the bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.wrapper}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        style={styles.chatContainer}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sent ? styles.sent : styles.received,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatContainer: {
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 6,
    borderRadius: 16,
    maxWidth: "80%",
  },
  sent: {
    backgroundColor: "#dcf8c6",
    alignSelf: "flex-end",
  },
  received: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingBottom: 25,
  },
  input: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007f5f",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
