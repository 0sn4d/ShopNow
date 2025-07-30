import { useAuthStore } from "@/store/authStore";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../components/button";
import AppColors from "@/assets/AppColors";

export default function ProfileScreen() {
  const { user, logout, checkSession } = useAuthStore();
  const router = useRouter();

  interface settingsProps {
    icon: string;
    label: string;
    danger?: boolean;
    onPress: () => void;
  }
  const SettingsItem: React.FC<settingsProps> = ({
    icon,
    label,
    danger,
    onPress,
  }) => (
    <TouchableOpacity style={styles.itemRow} onPress={onPress}>
      <View style={styles.itemLeft}>
        <Ionicons
          name={icon}
          size={20}
          color={danger ? "#e53935" : "#333"}
          style={{ marginRight: 12 }}
        />
        <Text style={[styles.itemText, danger && { color: "#e53935" }]}>
          {label}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#ccc" />
    </TouchableOpacity>
  );

  useEffect(() => {
    if (!user) {
      checkSession();
    }
  }, [user]);

  return user ? (
    <ScrollView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name} </Text>
            <Text style={styles.email}>{user?.email}</Text>
            <Text style={styles.memberSince}>Joining date</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="edit" size={20} color="#777" />
          </TouchableOpacity>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>0</Text>
            <Text style={styles.metricLabel}>Purchases</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>0</Text>
            <Text style={styles.metricLabel}>Reviews</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>0</Text>
            <Text style={styles.metricLabel}>Rating</Text>
          </View>
        </View>
      </View>

      {/* Settings List */}
      <View style={styles.settingsCard}>
        <SettingsItem
          icon="settings-outline"
          label="Settings"
          danger={false}
          onPress={logout}
        />
        <SettingsItem
          icon="heart-outline"
          label="Favorites"
          danger={false}
          onPress={() => router.push("/(tabs)/favorites")}
        />
        <SettingsItem
          icon="help-circle-outline"
          label="Help & Support"
          danger={false}
          onPress={logout}
        />
        <SettingsItem
          icon="log-out-outline"
          label="Sign Out"
          danger
          onPress={logout}
        />
      </View>
    </ScrollView>
  ) : (
    <View style={styles.welcomeContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/icon_main.png")}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      </View>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.promptText}>
        Please log in or signup to access all features
      </Text>
      <View style={styles.guestButtonsWrapper}>
        <Button
          title="Log In"
          fullWidth
          style={styles.logInButton}
          textStyle={styles.ButtonText}
          onPress={() => router.push("/(tabs)/login")}
        />

        <Button
          title="Signup"
          fullWidth
          variant="outline"
          textStyle={styles.signUpButtonText}
          style={{ borderColor: AppColors.primary }}
          onPress={() => router.push("/(tabs)/Signup")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 16,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.background.secondary, // Or any other suitable background
    padding: 24,
    bottom: 35,
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: AppColors.text.primary,
    marginBottom: 10,
  },
  promptText: {
    fontSize: 16,
    textAlign: "center",
    color: AppColors.text.placeholder,
    marginBottom: 30,
  },
  logInButton: {
    backgroundColor: AppColors.primary,
  },
  guestButtonsWrapper: {
    width: "100%",
    gap: 15,
  },
  ButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: AppColors.text.secondary,
  },
  signUpButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: AppColors.text.primary,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ccc", // Placeholder, replace with Image manually
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    color: "#555",
    fontSize: 14,
  },
  memberSince: {
    fontSize: 12,
    color: "#999",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 12,
  },
  metric: {
    alignItems: "center",
  },
  metricValue: {
    fontWeight: "bold",
    fontSize: 16,
  },
  metricLabel: {
    fontSize: 12,
    color: "#777",
  },
  settingsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 2,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});
