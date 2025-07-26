import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, Title } from "react-native-paper";
import * as Yup from "yup";

type AuthMode = "login" | "signup";

interface AuthFormValues {
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "At least 6 characters").required("Required"),
    confirmPassword:
      mode === "signup"
        ? Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Required")
        : Yup.string().notRequired(),
  });

  const initialValues: AuthFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleAuth = (values: AuthFormValues) => {
    if (mode === "login") {
      console.log("Logging in with:", values);
      // Add login logic here
    } else {
      console.log("Signing up with:", values);
      // Add sign-up logic here
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>
        {mode === "login" ? "Login" : "Sign Up"}
      </Title>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAuth}
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
              mode="outlined"
              autoCapitalize="none"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              outlineColor="green"
              activeOutlineColor="green"
              style={styles.input}
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              outlineColor="green"
              activeOutlineColor="green"
              style={styles.input}
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {mode === "signup" && (
              <>
                <TextInput
                  label="Confirm Password"
                  mode="outlined"
                  secureTextEntry
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  outlineColor="green"
                  activeOutlineColor="green"
                  style={styles.input}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
              </>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              {mode === "login" ? "Login" : "Sign Up"}
            </Button>

            <Button
              onPress={toggleMode}
              mode="text"
              textColor="black"
              style={styles.toggleButton}
            >
              {mode === "login"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 26,
    color: "green",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
    // marginHorizontal: 30,
    backgroundColor: "green",
  },
  toggleButton: {
    marginTop: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 4,
    marginBottom: 8,
  },
});

export default AuthScreen;
