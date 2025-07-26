import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BulletedListProps {
  items: string[];
  bulletStyle?: object;
  itemTextStyle?: object;
  itemContainerStyle?: object;
}

const BulletedList: React.FC<BulletedListProps> = ({
  items,
  bulletStyle,
  itemTextStyle,
  itemContainerStyle,
}) => {
  return (
    <View style={styles.listContainer}>
      {items.map((item, index) => (
        <View key={index} style={[styles.listItem, itemContainerStyle]}>
          <Text style={[styles.bullet, bulletStyle]}>{"\u2022"}</Text>
          <Text style={[styles.itemText, itemTextStyle]}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    // Basic container for the entire list
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  listItem: {
    flexDirection: "row", // Arrange bullet and text horizontally
    alignItems: "flex-start", // Align items to the top (important for multi-line text)
    marginBottom: 5, // Space between list items
  },
  bullet: {
    fontSize: 20, // Size of the bullet point
    lineHeight: 22, // Adjust line height to align with text
    marginRight: 8, // Space between bullet and text
    color: "#333", // Default color for the bullet
  },
  itemText: {
    flex: 1, // Allow text to wrap and take up remaining space
    fontSize: 16, // Font size for the list item text
    lineHeight: 22, // Match bullet line height for vertical alignment
    color: "#333", // Default color for the text
  },
});

export default BulletedList;
