"use client"

import { useContext } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { AuthContext } from "../contexts/AuthContext"
import CommentSection from "../components/CommentSection"

const ProjectDetailScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { project } = route.params
  const { user } = useContext(AuthContext)

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#10b981"
      case "in-progress":
        return "#f59e0b"
      case "planned":
        return "#3b82f6"
      case "delayed":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const handleContactPress = (phone) => {
    Alert.alert("Contact", `Call ${phone}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Call", onPress: () => Linking.openURL(`tel:${phone}`) },
    ])
  }

  const handleReportPress = () => {
    if (!user) {
      Alert.alert("Login Required", "Please login to submit a report", [
        { text: "Cancel", style: "cancel" },
        { text: "Login", onPress: () => navigation.navigate("Login") },
      ])
      return
    }
    navigation.navigate("Report", { projectId: project.id })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{project.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
          <Text style={styles.statusText}>{project.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Project Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Budget:</Text>
          <Text style={styles.value}>₱{project.budget.toLocaleString()}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Target Completion:</Text>
          <Text style={styles.value}>{project.targetDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Contractor:</Text>
          <TouchableOpacity onPress={() => handleContactPress(project.contractor.phone)}>
            <Text style={[styles.value, styles.link]}>{project.contractor.name}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${project.progress}%`,
                  backgroundColor: getStatusColor(project.status),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{project.progress}% Complete</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsible Officials</Text>
        {project.officials.map((official, index) => (
          <View key={index} style={styles.officialCard}>
            <Text style={styles.officialName}>{official.name}</Text>
            <Text style={styles.officialRole}>{official.role}</Text>
            <Text style={styles.officialTerm}>Term: {official.term}</Text>
            <Text style={styles.officialTrackRecord}>{official.trackRecord}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.reportButton} onPress={handleReportPress}>
        <Text style={styles.reportButtonText}>Report Issue with This Project</Text>
      </TouchableOpacity>

      <CommentSection projectId={project.id} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#6b7280",
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  link: {
    color: "#2563eb",
    textDecorationLine: "underline",
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressBar: {
    height: 20,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
  },
  progressText: {
    textAlign: "center",
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  officialCard: {
    backgroundColor: "#f9fafb",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  officialName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  officialRole: {
    fontSize: 14,
    color: "#2563eb",
    marginBottom: 5,
  },
  officialTerm: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 5,
  },
  officialTrackRecord: {
    fontSize: 12,
    color: "#374151",
    fontStyle: "italic",
  },
  reportButton: {
    backgroundColor: "#dc2626",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default ProjectDetailScreen
