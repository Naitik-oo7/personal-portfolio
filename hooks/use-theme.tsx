"use client"

import { useEffect, useState } from "react"

type Theme = "dark" | "light"

export function useClientTheme() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Get theme from localStorage or system preference
    const getInitialTheme = (): Theme => {
      if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme === "dark" || savedTheme === "light") {
          return savedTheme
        }
        // Check system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      }
      return "dark"
    }

    const initialTheme = getInitialTheme()
    setTheme(initialTheme)

    // Apply theme to document
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(initialTheme)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(theme)
      localStorage.setItem("theme", theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted,
  }
}
