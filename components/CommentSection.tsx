"use client"

import { useState, useContext, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from "react-native"
import { AuthContext } from "../contexts/AuthContext"
import { addComment, getComments } from "../services/projectService"

const CommentSection = ({ projectId }) => {
  const { user } = useContext(AuthContext)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadComments()
  }, [projectId])

  const loadComments = async () => {
    try {
      const projectComments = await getComments(projectId)
      setComments(projectComments)
    } catch (error) {
      console.error("Error loading comments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      Alert.alert("Error", "Please enter a comment")
      return
    }

    if (!user) {
      Alert.alert("Error", "You must be logged in to comment")
      return
    }

    setIsSubmitting(true)

    try {
      const comment = {
        text: newComment.trim(),
        projectId,
        userId: user.uid,
        userEmail: user.email,
        timestamp: new Date().toISOString(),
      }

      await addComment(comment)
      setNewComment("")
      loadComments() // Reload comments
    } catch (error) {
      console.error("Error submitting comment:", error)
      Alert.alert("Error", "Failed to submit comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    )
  }

  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentUser}>{item.userEmail}</Text>
        <Text style={styles.commentDate}>{formatDate(item.timestamp)}</Text>
      </View>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Comments & Feedback</Text>

      {user ? (
        <View style={styles.commentForm}>
          <TextInput
            style={styles.commentInput}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Share your thoughts or concerns..."
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            maxLength={300}
          />
          <View style={styles.commentFormFooter}>
            <Text style={styles.charCount}>{newComment.length}/300</Text>
            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmitComment}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>{isSubmitting ? "Posting..." : "Post Comment"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>Please login to post comments and engage with the community.</Text>
        </View>
      )}

      {isLoading ? (
        <Text style={styles.loadingText}>Loading comments...</Text>
      ) : comments.length > 0 ? (
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          style={styles.commentsList}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.noCommentsText}>No comments yet. Be the first to share your thoughts!</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
  commentForm: {
    marginBottom: 20,
  },
  commentInput: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    height: 80,
    textAlignVertical: "top",
  },
  commentFormFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  charCount: {
    fontSize: 12,
    color: "#6b7280",
  },
  submitButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  submitButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  loginPrompt: {
    backgroundColor: "#f3f4f6",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  loginPromptText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  commentsList: {
    maxHeight: 300,
  },
  commentItem: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  commentDate: {
    fontSize: 12,
    color: "#6b7280",
  },
  commentText: {
    fontSize: 14,
    color: "#111827",
    lineHeight: 20,
  },
  loadingText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    fontStyle: "italic",
  },
  noCommentsText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 10,
  },
})

export default CommentSection
