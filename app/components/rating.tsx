// components/Rating.tsx

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
  rating: number;
  maxRating?: number;
  showCount?: number;
  size?: number;
  color?: string;
};

const Rating: React.FC<Props> = ({
  rating,
  maxRating = 5,
  showCount,
  size = 16,
  color = "#FFD700",
}) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    let icon = "star-o";
    if (i <= Math.floor(rating)) {
      icon = "star";
    } else if (i - rating <= 0.5) {
      icon = "star-half-full";
    }

    stars.push(
      <Icon
        key={i}
        name={icon}
        size={size}
        color={color}
        style={{ marginRight: 2 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.stars}>{stars}</View>
      {showCount !== undefined && (
        <Text style={styles.countText}>({showCount} reviews)</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  stars: { flexDirection: "row" },
  countText: { marginLeft: 4, fontSize: 12, color: "#666" },
});

export default Rating;
