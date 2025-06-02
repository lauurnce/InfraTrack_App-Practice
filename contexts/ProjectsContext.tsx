"use client"

import { createContext, useState, useEffect } from "react"
import { getProjects } from "../services/projectService"

export const ProjectsContext = createContext({
  projects: [],
  refreshProjects: () => {},
})

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const projectsData = await getProjects()
      setProjects(projectsData)
    } catch (error) {
      console.error("Error loading projects:", error)
      // Load mock data if Firebase fails
      setProjects(getMockProjects())
    }
  }

  const refreshProjects = () => {
    loadProjects()
  }

  const value = {
    projects,
    refreshProjects,
  }

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}

// Mock data for demonstration
const getMockProjects = () => [
  {
    id: "1",
    title: "EDSA Road Widening Project",
    budget: 2500000000,
    status: "in-progress",
    progress: 65,
    targetDate: "December 2024",
    latitude: 14.5547,
    longitude: 121.0244,
    contractor: {
      name: "Metro Manila Construction Corp.",
      phone: "+63-2-8123-4567",
    },
    officials: [
      {
        name: "Maria Santos",
        role: "City Engineer",
        term: "2022-2025",
        trackRecord:
          "Successfully completed 15 major infrastructure projects in Metro Manila with 95% on-time delivery rate.",
      },
      {
        name: "Juan Dela Cruz",
        role: "Project Manager",
        term: "2023-2024",
        trackRecord: "Led infrastructure development projects worth ₱5B+ with focus on sustainable urban planning.",
      },
    ],
  },
  {
    id: "2",
    title: "Makati Sewage System Upgrade",
    budget: 850000000,
    status: "planned",
    progress: 15,
    targetDate: "March 2025",
    latitude: 14.5547,
    longitude: 121.0244,
    contractor: {
      name: "Philippine Water Works Inc.",
      phone: "+63-2-8987-6543",
    },
    officials: [
      {
        name: "Ana Rodriguez",
        role: "Environmental Engineer",
        term: "2022-2025",
        trackRecord: "Specialized in water treatment systems with 20+ years experience in municipal projects.",
      },
    ],
  },
  {
    id: "3",
    title: "BGC Drainage Improvement",
    budget: 450000000,
    status: "completed",
    progress: 100,
    targetDate: "Completed September 2024",
    latitude: 14.5515,
    longitude: 121.0488,
    contractor: {
      name: "Taguig Infrastructure Solutions",
      phone: "+63-2-8555-1234",
    },
    officials: [
      {
        name: "Roberto Kim",
        role: "District Engineer",
        term: "2021-2024",
        trackRecord: "Completed flood control projects that reduced flooding incidents by 80% in Taguig area.",
      },
    ],
  },
  {
    id: "4",
    title: "Quezon City Road Repair",
    budget: 320000000,
    status: "delayed",
    progress: 40,
    targetDate: "Originally June 2024, Extended to February 2025",
    latitude: 14.676,
    longitude: 121.0437,
    contractor: {
      name: "Northern Metro Construction",
      phone: "+63-2-8777-8888",
    },
    officials: [
      {
        name: "Lisa Fernandez",
        role: "Public Works Director",
        term: "2020-2025",
        trackRecord:
          "Managed road infrastructure projects across 6 districts with emphasis on traffic management during construction.",
      },
    ],
  },
]
