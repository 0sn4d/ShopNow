import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const recentChats = [
  { id: '1', name: 'Alice', lastMessage: 'Hey! How are you?' },
  { id: '2', name: 'Bob', lastMessage: 'Let’s catch up later.' },
  { id: '3', name: 'Charlie', lastMessage: 'Meeting at 5pm.' },
];

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigation.navigate('messages', { name: item.name })}
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
      <TextInput style={{
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        fontWeight: 'bold',
        paddingTop: 10,    
        paddingBottom: 10,
        borderRadius: 15,
      }}
      placeholder='   Search Messages'
      placeholderTextColor='#888'
      />
      <FlatList
        data={recentChats}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', paddingTop: 40, },
  header: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  list: { paddingHorizontal: 16 },
  chatItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2
  },
  chatInfo: {},
  chatName: { fontSize: 18, fontWeight: 'bold' },
  chatMessage: { fontSize: 14, color: '#555', marginTop: 4 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
