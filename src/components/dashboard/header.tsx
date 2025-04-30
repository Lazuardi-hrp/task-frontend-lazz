"use client"

import type { User } from "@/lib/auth"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks/use-logout"
import { LogOut } from "lucide-react"

interface DashboardHeaderProps {
   user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
   const { logout, isLoading } = useLogout()

   return (
      <header className="h-16 border-b flex items-center justify-between px-4 md:px-6 bg-card">
         <div className="hidden md:block">
         <h1 className="text-lg font-medium">Welcome, {user.name}</h1>
         </div>

         <div className="flex items-center gap-4">
         <ModeToggle />
         <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2"
            onClick={() => logout()}
            disabled={isLoading}
         >
            <LogOut className="h-4 w-4" />
            {isLoading ? "Logging out..." : "Logout"}
         </Button>
         </div>
      </header>
   )
}
