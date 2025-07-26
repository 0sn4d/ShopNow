import AppColors from "@/assets/AppColors";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  isFav?: boolean;
  handleToggleFavorite?: () => void;
}

const CommonHeader = ({ isFav, handleToggleFavorite }: Props) => {
  const router = useRouter();
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Feather name="arrow-left" size={20} color={AppColors.text.primary} />
      </TouchableOpacity>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[styles.favoriteButton, isFav && styles.activeFavoriteButton]}
        >
          <AntDesign
            name="hearto"
            size={20}
            color={
              isFav ? AppColors.background.primary : AppColors.text.primary
            }
            fill={isFav ? "transparent" : AppColors.background.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: AppColors.background.secondary,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeFavoriteButton: {
    backgroundColor: AppColors.status.error,
  },
  buttonView: {
    flexDirection: "row",
    gap: 5,
  },
});
