"use client"

import { useState, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { AuthContext } from "../contexts/AuthContext"
import { submitReport } from "../services/projectService"

const ReportScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const projectId = route.params?.projectId || null

  const categories = [
    { value: "general", label: "General Issue" },
    { value: "safety", label: "Safety Concern" },
    { value: "quality", label: "Quality Issue" },
    { value: "delay", label: "Project Delay" },
    { value: "budget", label: "Budget Concern" },
  ]

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    if (!user) {
      Alert.alert("Error", "You must be logged in to submit a report")
      return
    }

    setIsSubmitting(true)

    try {
      await submitReport({
        title: title.trim(),
        description: description.trim(),
        category,
        projectId,
        userId: user.uid,
        userEmail: user.email,
        timestamp: new Date().toISOString(),
        status: "pending",
      })

      Alert.alert("Success", "Your report has been submitted successfully. Thank you for your feedback!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ])
    } catch (error) {
      console.error("Error submitting report:", error)
      Alert.alert("Error", "Failed to submit report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Submit a Report</Text>
          <Text style={styles.subtitle}>Help us improve city infrastructure by reporting issues or concerns</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Report Title *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Brief description of the issue"
              maxLength={100}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoryContainer}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.value}
                    style={[styles.categoryButton, category === cat.value && styles.categoryButtonActive]}
                    onPress={() => setCategory(cat.value)}
                  >
                    <Text style={[styles.categoryText, category === cat.value && styles.categoryTextActive]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Provide detailed information about the issue..."
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={500}
            />
            <Text style={styles.charCount}>{description.length}/500</Text>
          </View>

          {projectId && (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>This report will be linked to the selected project</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>{isSubmitting ? "Submitting..." : "Submit Report"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
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
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  charCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  categoryContainer: {
    flexDirection: "row",
    gap: 10,
  },
  categoryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryButtonActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  categoryText: {
    fontSize: 14,
    color: "#6b7280",
  },
  categoryTextActive: {
    color: "#fff",
  },
  infoBox: {
    backgroundColor: "#dbeafe",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#1e40af",
  },
  submitButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default ReportScreen
