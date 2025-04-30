"use client"

import { useState } from "react"

export function useLogout() {
   const [isLoading, setIsLoading] = useState(false)

   const logout = async () => {
      setIsLoading(true)

      try {
         // Call the logout API endpoint
         const response = await fetch("/api/auth/logout", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include", // Important for cookies
         })

         if (!response.ok) {
         throw new Error("Logout failed")
         }

         // Force a complete page reload and redirect to login
         window.location.href = "/login"
      } catch (error) {
         console.error("Logout error:", error)
         alert("Failed to log out. Please try again.")
         setIsLoading(false)
      }
   }

   return { logout, isLoading }
}
