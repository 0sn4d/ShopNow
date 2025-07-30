import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import AppColors from "@/assets/AppColors";
import { TextInput } from "react-native-paper";
import Button from "../components/button";
import Toast from "react-native-toast-message";

const login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "At least 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();

  const toggleMode = () => {
    router.push("/(tabs)/Signup");
  };

  const handlelogin = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      console.log("Login successful!");
      router.push("/(tabs)");

      Toast.show({
        type: "success",
        text1: "Login Successful",
      });
    } catch (err: any) {
      console.error("Login failed:", err);

      Toast.show({
        type: "error",
        text1: "Login Failed",
      });
    }
  };

  return (
    <View style={styles.safeView}>
      <Text style={styles.title}>Log In</Text>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // 'padding' for iOS, 'height' or 'position' for Android
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/icon_main.png")}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            </View>
            <Text style={styles.subtitle}>Log into your account</Text>
          </View>
          <View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handlelogin}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <TextInput
                    label="Email"
                    placeholder="Enter your email"
                    placeholderTextColor={AppColors.text.descript}
                    mode="outlined"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    outlineColor="#00695c"
                    activeOutlineColor="#00695c"
                    style={styles.input}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  <TextInput
                    label="Password"
                    placeholder="Enter your password"
                    placeholderTextColor={AppColors.text.descript}
                    mode="outlined"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    outlineColor={AppColors.primary}
                    activeOutlineColor={AppColors.primary}
                    style={styles.input}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}

                  <Button
                    onPress={() => handlelogin(values)}
                    title="Log in"
                    fullWidth
                    loading={isLoading}
                    style={styles.button}
                  />

                  <Button
                    onPress={toggleMode}
                    title="Don't have an account? Sign Up"
                    variant="ghost"
                    textStyle={{ color: AppColors.primary }}
                    style={styles.toggleButton}
                  />
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: AppColors.background.tertiary,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  toggleButton: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Inter-Bold",
    textAlign: "center",
    paddingTop: 15,
    fontSize: 30,
    color: AppColors.primary,
    overflow: "hidden",
  },
  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: AppColors.text.placeholder,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#00695c",
    width: "100%",
  },

  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 4,
    marginBottom: 8,
  },
  footerText: {
    color: AppColors.text.descript,
  },
  link: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: AppColors.accent.blue,
    marginLeft: 4,
  },
  errorText: {
    color: AppColors.status.error,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
});
