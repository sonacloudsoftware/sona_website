"use client"

import { useState, useEffect } from "react"

interface User {
  email: string
  name: string
  role: string
}

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem("admin-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    if (email === "admin@sonacloud.com" && password === "sonacloud2024") {
      const userData = {
        email,
        name: "Administrador SonaCloud",
        role: "admin",
      }
      localStorage.setItem("admin-user", JSON.stringify(userData))
      setUser(userData)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("admin-user")
    setUser(null)
  }

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }
}
