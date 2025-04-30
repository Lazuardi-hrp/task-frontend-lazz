import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { User, Post } from "@/lib/types"
import { Users, FileText, Activity } from "lucide-react"

interface DashboardOverviewProps {
   users: User[]
   posts: Post[]
}

export function DashboardOverview({ users, posts }: DashboardOverviewProps) {
   // Calculate stats
   const totalUsers = users.length
   const totalPosts = posts.length
   const avgPostsPerUser = totalUsers > 0 ? (totalPosts / totalUsers).toFixed(1) : "0"

   return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
         <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
         </CardHeader>
         <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users in the system</p>
         </CardContent>
         </Card>

         <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
         </CardHeader>
         <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">Posts created by all users</p>
         </CardContent>
         </Card>

         <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Posts Per User</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
         </CardHeader>
         <CardContent>
            <div className="text-2xl font-bold">{avgPostsPerUser}</div>
            <p className="text-xs text-muted-foreground">Average number of posts per user</p>
         </CardContent>
         </Card>
      </div>
   )
}
