import type { Metadata } from "next"
import { DashboardOverview } from "@/components/dashboard/overview"
import { getUsers, getPosts } from "@/lib/data"

export const metadata: Metadata = {
   title: "Dashboard | User Dashboard",
   description: "Overview of user data",
}

export default async function DashboardPage() {
   const [users, posts] = await Promise.all([getUsers(), getPosts()])

   return (
      <div className="space-y-6">
         <h1 className="text-3xl font-bold">Dashboard</h1>
         <DashboardOverview users={users} posts={posts} />
      </div>
   )
}
