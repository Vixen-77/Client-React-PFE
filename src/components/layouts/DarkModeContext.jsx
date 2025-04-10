"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Créer le contexte
const DarkModeContext = createContext()

// Créer le provider
export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)

  // Effet pour initialiser l'état du mode sombre
  useEffect(() => {
    // Vérifier si la classe 'dark' est présente sur l'élément HTML
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)

    // Observer les changements de classe sur l'élément HTML
    const observer = new MutationObserver(() => {
      const isDarkMode = document.documentElement.classList.contains("dark")
      setIsDark(isDarkMode)
    })

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  // Fonction pour basculer le mode sombre
  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
    setIsDark(!isDark)
  }

  return <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>{children}</DarkModeContext.Provider>
}

// Hook personnalisé pour utiliser le contexte
export function useDarkMode() {
  return useContext(DarkModeContext)
}