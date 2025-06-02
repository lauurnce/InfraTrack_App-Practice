"use client"

import { useContext, useState } from "react"
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { useNavigation } from "@react-navigation/native"
import { ProjectsContext } from "../contexts/ProjectsContext"
import { AuthContext } from "../contexts/AuthContext"

const MapScreen = () => {
  const navigation = useNavigation()
  const { projects } = useContext(ProjectsContext)
  const { user } = useContext(AuthContext)
  const [selectedProject, setSelectedProject] = useState(null)

  // Default to Manila, Philippines coordinates
  const initialRegion = {
    latitude: 14.5995,
    longitude: 120.9842,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const handleMarkerPress = (project) => {
    setSelectedProject(project)
    navigation.navigate("ProjectDetail", { project })
  }

  const handleReportPress = () => {
    if (!user) {
      Alert.alert("Login Required", "Please login to submit a report", [
        { text: "Cancel", style: "cancel" },
        { text: "Login", onPress: () => navigation.navigate("Login") },
      ])
      return
    }
    navigation.navigate("Report")
  }

  const getMarkerColor = (status) => {
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

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {projects.map((project) => (
          <Marker
            key={project.id}
            coordinate={{
              latitude: project.latitude,
              longitude: project.longitude,
            }}
            title={project.title}
            description={`Status: ${project.status}`}
            pinColor={getMarkerColor(project.status)}
            onPress={() => handleMarkerPress(project)}
          />
        ))}
      </MapView>

      <TouchableOpacity style={styles.reportButton} onPress={handleReportPress}>
        <Text style={styles.reportButtonText}>Report Issue</Text>
      </TouchableOpacity>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Project Status</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#3b82f6" }]} />
          <Text style={styles.legendText}>Planned</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#f59e0b" }]} />
          <Text style={styles.legendText}>In Progress</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#10b981" }]} />
          <Text style={styles.legendText}>Completed</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#ef4444" }]} />
          <Text style={styles.legendText}>Delayed</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  reportButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "#dc2626",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  reportButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  legend: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  legendTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
    color: "#374151",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: "#6b7280",
  },
})

export default MapScreen
