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

const Signup = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "At least 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const router = useRouter();
  const { signup, isLoading, error } = useAuthStore();

  const handleSignup = async (values: { email: string; password: string }) => {
    try {
      await signup(values.email, values.password);
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

  const toggleMode = () => {
    router.push("/(tabs)/login");
  };
  return (
    <View style={styles.safeView}>
      <Text style={styles.title}>Sign Up</Text>
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
            <Text style={styles.subtitle}>Create a new account</Text>
          </View>
          <View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Formik
              initialValues={{ email: "", password: "", confirmPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
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

                  <TextInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    placeholderTextColor={AppColors.text.descript}
                    mode="outlined"
                    secureTextEntry
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    outlineColor={AppColors.primary}
                    activeOutlineColor={AppColors.primary}
                    style={styles.input}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}
                  <Button
                    onPress={() => handleSignup(values)}
                    title="Sign Up"
                    fullWidth
                    loading={isLoading}
                    style={styles.button}
                  />

                  <Button
                    onPress={toggleMode}
                    title="Already have an account? Log In"
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

export default Signup;

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
    paddingTop: 60,
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
