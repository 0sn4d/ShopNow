import AppColors from "@/assets/AppColors";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: AppColors.background.primary,
        tabBarLabel: () => null,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={30} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text className="text-sm font-semibold" style={{ color }}>
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="inbox" size={30} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text className="text-sm font-semibold" style={{ color }}>
              Inbox
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="offer"
        options={{
          title: "Post An Item", // headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="camera" size={30} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text className="text-sm font-semibold" style={{ color }}>
              Post
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="discount"
        options={{
          title: "Discount",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="discount" size={30} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text className="text-sm font-semibold" style={{ color }}>
              Selling
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerShown: false,
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={35} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text className="text-sm font-semibold" style={{ color }}>
              Profile
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="product/[id]"
        options={{
          headerShown: false,
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Signup"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
