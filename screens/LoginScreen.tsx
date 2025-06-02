"use client"

import { useState, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../contexts/AuthContext"

const LoginScreen = () => {
  const navigation = useNavigation()
  const { signIn, signUp } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setIsLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password)
        Alert.alert("Success", "Account created successfully!")
      } else {
        await signIn(email, password)
      }
      navigation.goBack()
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.content}>
        <Text style={styles.title}>{isSignUp ? "Create Account" : "Welcome Back"}</Text>
        <Text style={styles.subtitle}>
          {isSignUp
            ? "Join the community to report issues and stay informed"
            : "Sign in to submit reports and engage with the community"}
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.authButton, isLoading && styles.authButtonDisabled]}
            onPress={handleAuth}
            disabled={isLoading}
          >
            <Text style={styles.authButtonText}>
              {isLoading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchButton} onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.switchButtonText}>
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.guestSection}>
          <Text style={styles.guestText}>
            You can browse projects without an account, but login is required to submit reports.
          </Text>
          <TouchableOpacity style={styles.guestButton} onPress={() => navigation.goBack()}>
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#111827",
  },
  authButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  authButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  authButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchButton: {
    marginTop: 20,
    alignItems: "center",
  },
  switchButtonText: {
    color: "#2563eb",
    fontSize: 16,
  },
  guestSection: {
    alignItems: "center",
  },
  guestText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 20,
  },
  guestButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  guestButtonText: {
    color: "#374151",
    fontSize: 16,
  },
})

export default LoginScreen
