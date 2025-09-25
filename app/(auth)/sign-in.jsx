import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
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

import { Image } from "expo-image";

import { authStyles } from "../../assets/styles/auth.styles";
import { withoutAuthAxios } from "../../config/config";
import { COLORS } from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";

const SignInScreen = () => {
  const router = useRouter();
    const { user,handleLogin } = useAuth()


console.log("user",user)
   if (user) return <Redirect href={"/"} />;


  const [email, setEmail] = useState("manish@gmail.com");
  const [password, setPassword] = useState("Manish@123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {

    console.log("handleSignIn",user)
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }


    setLoading(true);

    try {
    
      const response =await withoutAuthAxios().post(`/login`, {
        email: email,
        password: password,
      });

      console.log("response", response.data)
      
      // Handle successful sign-in
    //  Alert.alert("Success", "Sign in successful!");
      // You might want to navigate to the home screen

      handleLogin(response.data.user,response.data.token)
      router.push("/")
    } catch (error) {
     Alert.alert(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i1.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Welcome Back</Text>

          {/* FORM CONTAINER */}
          <View style={authStyles.formContainer}>
            {/* Email Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter email"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* PASSWORD INPUT */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
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
            </View>

            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={handleSignIn}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>{loading ? "Signing In..." : "Sign In"}</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.push("/(auth)/sign-up")}
            >
              <Text style={authStyles.linkText}>
                Don&apos;t have an account? <Text style={authStyles.link}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default SignInScreen;
