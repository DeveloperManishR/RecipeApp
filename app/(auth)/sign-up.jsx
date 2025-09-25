import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";
import { authStyles } from "../../assets/styles/auth.styles";
import { withoutAuthAxios } from "../../config/config";
import { COLORS } from "../../constants/colors";

const SignUpScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Define the validation schema
  const signUpSchema = z.object({
    name: z.string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be less than 20 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z.string()
      .email("Please enter a valid email address"),
    password: z.string()
      .min(6, "Password must be at least 6 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number")
  });


  const validateForm = () => {
    try {
      signUpSchema.parse({ name, email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};

        error.issues.forEach((issue) => {
          const field = issue.path[0];
          // keep only the first error per field
          if (!newErrors[field]) {
            newErrors[field] = issue.message;
          }
        });

        setErrors(newErrors);
      } else {
        console.error("Unexpected error:", error);
      }
      return false;
    }
  };


  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const payLoad = {
      name: name,
      email: email.toLocaleLowerCase(),
      password: password
    };

    try {
      const response = await withoutAuthAxios().post(`/register`, payLoad);
    
router.back()
      // You might want to navigate to login or verify email screen
    } catch (err) {
      Alert.alert("Error", err.errors?.[0]?.message || "Failed to create account");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={authStyles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Container */}
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i2.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Create Account</Text>

          <View style={authStyles.formContainer}>

            <View style={authStyles.inputContainer}>
              <TextInput
                style={[
                  authStyles.textInput,
                  errors.name && authStyles.inputError
                ]}
                placeholder="Enter name"
                placeholderTextColor={COLORS.textLight}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                autoCapitalize="words"
              />
              {errors.name && <Text style={authStyles.errorText}>{errors.name}</Text>}
            </View>

            {/* Email Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={[
                  authStyles.textInput,
                  errors.email && authStyles.inputError
                ]}
                placeholder="Enter email"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={authStyles.errorText}>{errors.email}</Text>}
            </View>

            {/* Password Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={[
                  authStyles.textInput,
                  errors.password && authStyles.inputError
                ]}
                placeholder="Enter password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
              {errors.password && <Text style={authStyles.errorText}>{errors.password}</Text>}
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>
                {loading ? "Creating Account..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <TouchableOpacity style={authStyles.linkContainer} onPress={() => router.back()}>
              <Text style={authStyles.linkText}>
                Already have an account? <Text style={authStyles.link}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;