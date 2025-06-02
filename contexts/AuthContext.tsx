"use client"

import { createContext, useState, useEffect } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase"

export const AuthContext = createContext({
  user: null,
  signIn: async (email, password) => {},
  signUp: async (email, password) => {},
  logout: async () => {},
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const value = {
    user,
    signIn,
    signUp,
    logout,
  }

  if (isLoading) {
    return null // Or a loading screen
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
