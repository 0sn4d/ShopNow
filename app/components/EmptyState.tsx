import AppColors from "@/assets/AppColors";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./button";

type EmptyStateType = "cart" | "search" | "favorites" | "orders" | "profile";
interface EmptyStateProps {
  type: EmptyStateType;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  message,
  actionLabel,
  onAction,
}) => {
  const size = 64;
  const color = AppColors.text.placeholder;
  const getIcon = () => {
    switch (type) {
      case "search":
        return <AntDesign name="search1" size={size} color={color} />;
      case "favorites":
        return <AntDesign name="hearto" size={size} color={color} />;
      default:
        return <AntDesign name="user" size={size} color={color} />;
    }
  };
  const getDefaultMessage = () => {
    switch (type) {
      case "search":
        return "No products found";
      case "favorites":
        return "Your favorites list is empty";
      default:
        return "Nothing to see here";
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.iconContainer}>{getIcon()}</Text>
      <Text style={styles.message}>{message || getDefaultMessage()}</Text>
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: AppColors.text.placeholder,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
});
