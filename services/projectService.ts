// projectService.ts

// This file will contain the logic for interacting with project data.
// For example, fetching project details, creating new projects, etc.

import { collection, addDoc, getDocs, query, where, orderBy, doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"

// Placeholder function to simulate fetching project details
const getProjectDetails = async (projectId: string) => {
  return {
    id: projectId,
    name: "Sample Project",
    description: "This is a sample project description.",
    status: "In Progress",
  }
}

// Get all projects
export const getProjects = async () => {
  try {
    const projectsCollection = collection(db, "projects")
    const projectSnapshot = await getDocs(projectsCollection)
    const projectList = projectSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return projectList
  } catch (error) {
    console.error("Error fetching projects:", error)
    throw error
  }
}

// Get a specific project
export const getProject = async (projectId) => {
  try {
    const projectDoc = doc(db, "projects", projectId)
    const projectSnapshot = await getDoc(projectDoc)

    if (projectSnapshot.exists()) {
      return {
        id: projectSnapshot.id,
        ...projectSnapshot.data(),
      }
    } else {
      throw new Error("Project not found")
    }
  } catch (error) {
    console.error("Error fetching project:", error)
    throw error
  }
}

// Submit a report
export const submitReport = async (reportData) => {
  try {
    const reportsCollection = collection(db, "reports")
    const docRef = await addDoc(reportsCollection, reportData)
    return docRef.id
  } catch (error) {
    console.error("Error submitting report:", error)
    throw error
  }
}

// Add a comment
export const addComment = async (commentData) => {
  try {
    const commentsCollection = collection(db, "comments")
    const docRef = await addDoc(commentsCollection, commentData)
    return docRef.id
  } catch (error) {
    console.error("Error adding comment:", error)
    throw error
  }
}

// Get comments for a project
export const getComments = async (projectId) => {
  try {
    const commentsCollection = collection(db, "comments")
    const q = query(commentsCollection, where("projectId", "==", projectId), orderBy("timestamp", "desc"))
    const commentSnapshot = await getDocs(q)
    const commentList = commentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return commentList
  } catch (error) {
    console.error("Error fetching comments:", error)
    return [] // Return empty array if error
  }
}

// Get reports
export const getReports = async (projectId = null) => {
  try {
    const reportsCollection = collection(db, "reports")
    let q

    if (projectId) {
      q = query(reportsCollection, where("projectId", "==", projectId), orderBy("timestamp", "desc"))
    } else {
      q = query(reportsCollection, orderBy("timestamp", "desc"))
    }

    const reportSnapshot = await getDocs(q)
    const reportList = reportSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return reportList
  } catch (error) {
    console.error("Error fetching reports:", error)
    throw error
  }
}

export { getProjectDetails }
