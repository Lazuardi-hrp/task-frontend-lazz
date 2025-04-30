"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, LayoutDashboard, Menu, X, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLogout } from "@/hooks/use-logout"

export function DashboardSidebar() {
   const pathname = usePathname()
   const [isOpen, setIsOpen] = useState(false)
   const { logout, isLoading } = useLogout()

   const toggleSidebar = () => {
      setIsOpen(!isOpen)
   }

   const closeSidebar = () => {
      setIsOpen(false)
   }

   const navItems = [
      {
         name: "Dashboard",
         href: "/dashboard",
         icon: LayoutDashboard,
      },
      {
         name: "Users",
         href: "/dashboard/users",
         icon: Users,
      },
      {
         name: "Settings",
         href: "/dashboard/settings",
         icon: Settings,
      },
   ]

   return (
      <>
         {/* Mobile sidebar toggle */}
         <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={toggleSidebar}>
         <Menu className="h-6 w-6" />
         <span className="sr-only">Toggle sidebar</span>
         </Button>

         {/* Sidebar backdrop for mobile */}
         {isOpen && (
         <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={closeSidebar} />
         )}

         {/* Sidebar */}
         <aside
         className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 md:relative md:z-0",
            isOpen ? "translate-x-0" : "-translate-x-full",
         )}
         >
         <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link href="/dashboard" className="flex items-center" onClick={closeSidebar}>
               <span className="text-xl font-bold">User Dashboard</span>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={closeSidebar}>
               <X className="h-5 w-5" />
               <span className="sr-only">Close sidebar</span>
            </Button>
         </div>

         <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
               <Link
               key={item.href}
               href={item.href}
               onClick={closeSidebar}
               className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
               )}
               >
               <item.icon className="h-5 w-5" />
               {item.name}
               </Link>
            ))}

            <Button
               variant="ghost"
               className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium justify-start mt-auto hover:bg-muted"
               onClick={() => logout()}
               disabled={isLoading}
            >
               <LogOut className="h-5 w-5" />
               {isLoading ? "Logging out..." : "Logout"}
            </Button>
         </nav>
         </aside>
      </>
   )
}
