"use client"

import { useEffect } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"

const SplashScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Map")
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View style={styles.container}>
      <Image source={{ uri: "/placeholder.svg?height=120&width=120" }} style={styles.logo} />
      <Text style={styles.title}>City Infrastructure</Text>
      <Text style={styles.subtitle}>Transparency in Public Works</Text>
      <View style={styles.loadingContainer}>
        <View style={styles.loadingBar} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563eb",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#e2e8f0",
    marginBottom: 40,
  },
  loadingContainer: {
    width: 200,
    height: 4,
    backgroundColor: "#3b82f6",
    borderRadius: 2,
    overflow: "hidden",
  },
  loadingBar: {
    width: "60%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 2,
  },
})

export default SplashScreen
