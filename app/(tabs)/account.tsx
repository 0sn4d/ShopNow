import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>name </Text>
            <Text style={styles.email}>example@gmail.com</Text>
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
        <SettingsItem icon="settings-outline" label="Settings" danger={false} />
        <SettingsItem icon="heart-outline" label="Favorites" danger={false} />
        <SettingsItem
          icon="help-circle-outline"
          label="Help & Support"
          danger={false}
        />
        <SettingsItem icon="log-out-outline" label="Sign Out" danger />
      </View>
    </ScrollView>
  );
}

interface settingsProps {
  icon: string;
  label: string;
  danger?: boolean;
}
const SettingsItem: React.FC<settingsProps> = ({ icon, label, danger }) => (
  <TouchableOpacity style={styles.itemRow}>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 16,
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
