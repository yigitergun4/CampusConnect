import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLogin } from "@/context/LoginContext";

const RegisterScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { registerUser, isEmailTaken } = useLogin();

  const validateForm: () => boolean = () => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    } else if (isEmailTaken(email)) {
      newErrors.email = "Email is already registered";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Gender validation
    if (!gender) {
      newErrors.gender = "Please select your gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister: () => void = () => {
    if (!validateForm()) {
      return;
    }

    const success = registerUser(
      email,
      password,
      gender as "male" | "female" | "other"
    );

    if (success) {
      Alert.alert(
        "Registration Successful",
        "Your account has been created successfully!",
        [
          {
            text: "OK",
            onPress: () => router.replace("/signin"),
          },
        ]
      );
    } else {
      Alert.alert(
        "Registration Failed",
        "Something went wrong. Please try again."
      );
    }
  };

  const handleGoToSignIn: () => void = () => {
    router.replace("/signin");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.scrollContent}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <FontAwesome name="university" size={40} color="#fff" />
                <Text style={styles.title}>Create Account</Text>
              </View>
            </View>
            {/* Form */}
            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              {/* Password Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  placeholder="Password (min 6 characters)"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }
                  }}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    errors.confirmPassword && styles.inputError,
                  ]}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword) {
                      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                    }
                  }}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
              {/* Gender Selection */}
              <View style={styles.inputContainer}>
                <Text style={styles.genderLabel}>Gender</Text>
                <View style={styles.genderContainer}>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === "male" && styles.genderButtonSelected,
                    ]}
                    onPress={() => {
                      setGender("male");
                      if (errors.gender) {
                        setErrors((prev) => ({ ...prev, gender: "" }));
                      }
                    }}
                  >
                    <FontAwesome
                      name="mars"
                      size={20}
                      color={gender === "male" ? "#fff" : "#999"}
                    />
                    <Text
                      style={[
                        styles.genderText,
                        gender === "male" && styles.genderTextSelected,
                      ]}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === "female" && { backgroundColor: "#E7120E" },
                    ]}
                    onPress={() => {
                      setGender("female");
                      if (errors.gender) {
                        setErrors((prev) => ({ ...prev, gender: "" }));
                      }
                    }}
                  >
                    <FontAwesome
                      name="venus"
                      size={20}
                      color={gender === "female" ? "#fff" : "#999"}
                    />
                    <Text
                      style={[
                        styles.genderText,
                        gender === "female" && styles.genderTextSelected,
                      ]}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === "other" && styles.genderButtonSelected,
                      gender === "other" && { backgroundColor: "#7E7C7C" },
                    ]}
                    onPress={() => {
                      setGender("other");
                      if (errors.gender) {
                        setErrors((prev) => ({ ...prev, gender: "" }));
                      }
                    }}
                  >
                    <FontAwesome
                      name="genderless"
                      size={20}
                      color={gender === "other" ? "#fff" : "#999"}
                    />
                    <Text
                      style={[
                        styles.genderText,
                        gender === "other" && styles.genderTextSelected,
                      ]}
                    >
                      Other
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.gender && (
                  <Text style={styles.errorText}>{errors.gender}</Text>
                )}
              </View>
              {/* Register Button */}
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                activeOpacity={0.8}
              >
                <Text style={styles.registerButtonText}>Create Account</Text>
              </TouchableOpacity>
              {/* Back to Login */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleGoToSignIn}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>
                  Already have an account? Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    paddingTop: 20,
    marginBottom: 40,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 15,
    letterSpacing: 1,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#333",
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 25,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#444",
  },
  inputError: {
    borderColor: "#dc3545",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 15,
  },
  genderLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 5,
  },
  genderContainer: {
    flexDirection: "row",
    gap: 10,
  },
  genderButton: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  genderButtonSelected: {
    backgroundColor: "#093C71",
    borderColor: "#093C71",
  },
  genderText: {
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
  },
  genderTextSelected: {
    color: "#fff",
  },
  registerButton: {
    backgroundColor: "#093C71",
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#4A69BD",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "transparent",
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#fff",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default RegisterScreen;
