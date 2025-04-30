import type React from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default async function DashboardLayout({
   children,
   }: {
   children: React.ReactNode
   }) {
   const session = await getSession()

   if (!session) {
      redirect("/login")
   }

   return (
      <div className="flex h-screen bg-background">
         <DashboardSidebar />
         <div className="flex flex-col flex-1 overflow-hidden">
         <DashboardHeader user={session.user} />
         <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
         </div>
      </div>
   )
}
