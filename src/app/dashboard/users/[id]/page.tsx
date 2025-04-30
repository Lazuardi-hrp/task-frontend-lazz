import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getUserById, getPostsByUserId } from "@/lib/data"
import { UserDetail } from "@/components/users/user-detail"
import { UserPosts } from "@/components/users/user-posts"

interface UserPageProps {
   params: {
      id: string
   }
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
   // Use this pattern to access params in an async context
   const id = await Promise.resolve(params.id)
   const userId = Number.parseInt(id)
   const user = await getUserById(userId)

   if (!user) {
      return {
         title: "User Not Found",
      }
   }

   return {
      title: `${user.name} | User Dashboard`,
      description: `View and edit details for ${user.name}`,
   }
}

export default async function UserPage({ params }: UserPageProps) {
   // Use this pattern to access params in an async context
   const id = await Promise.resolve(params.id)
   const userId = Number.parseInt(id)
   
   const [user, posts] = await Promise.all([
      getUserById(userId), 
      getPostsByUserId(userId)
   ])

   if (!user) {
      notFound()
   }

   return (
      <div className="space-y-8">
         <UserDetail user={user} />
         <UserPosts posts={posts} />
      </div>
   )
}