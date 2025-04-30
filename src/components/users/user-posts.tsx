"use client"

import { useState } from "react"
import type { Post } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface UserPostsProps {
   posts: Post[]
}

export function UserPosts({ posts }: UserPostsProps) {
   const [searchQuery, setSearchQuery] = useState("")

   const filteredPosts = posts.filter(
      (post) =>
         post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         post.body.toLowerCase().includes(searchQuery.toLowerCase()),
   )

   return (
      <Card>
         <CardHeader>
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
               <CardTitle>User Posts</CardTitle>
               <CardDescription>{posts.length} posts by this user</CardDescription>
            </div>
            <div className="relative w-full sm:w-auto">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input
               type="search"
               placeholder="Search posts..."
               className="w-full sm:w-[300px] pl-8"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>
         </CardHeader>
         <CardContent>
         <div className="space-y-4">
            {filteredPosts.length > 0 ? (
               filteredPosts.map((post) => (
               <div key={post.id} className="border rounded-md p-4">
                  <h3 className="text-lg font-semibold capitalize mb-2">{post.title}</h3>
                  <p className="text-muted-foreground">{post.body}</p>
               </div>
               ))
            ) : (
               <div className="text-center py-8">
               <p className="text-muted-foreground">No posts found matching your search.</p>
               </div>
            )}
         </div>
         </CardContent>
      </Card>
   )
}
