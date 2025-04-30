"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserInfoTab } from "./user-info-tab"
import { UserEditForm } from "./user-edit-form"

interface UserDetailProps {
   user: User
}

export function UserDetail({ user }: UserDetailProps) {
   const router = useRouter()
   const [activeTab, setActiveTab] = useState("info")
   const [isEditing, setIsEditing] = useState(false)

   const handleEditSuccess = () => {
      setIsEditing(false)
      router.refresh()
   }

   return (
      <Card>
         <CardHeader className="flex flex-row items-start justify-between">
         <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>@{user.username}</CardDescription>
         </div>
         {activeTab === "info" && !isEditing && <Button onClick={() => setIsEditing(true)}>Edit User</Button>}
         {isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(false)}>
               Cancel
            </Button>
         )}
         </CardHeader>
         <CardContent>
         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
               <TabsTrigger value="info">User Info</TabsTrigger>
               <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="pt-4">
               {isEditing ? <UserEditForm user={user} onSuccess={handleEditSuccess} /> : <UserInfoTab user={user} />}
            </TabsContent>
            <TabsContent value="contact" className="pt-4">
               <div className="grid gap-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                     <p className="text-base">{user.email}</p>
                  </div>
                  <div>
                     <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                     <p className="text-base">{user.phone}</p>
                  </div>
               </div>

               <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Website</h3>
                  <p className="text-base">
                     <a
                     href={`https://${user.website}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-primary hover:underline"
                     >
                     {user.website}
                     </a>
                  </p>
               </div>

               <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Address</h3>
                  <p className="text-base">
                     {user.address.street}, {user.address.suite}
                     <br />
                     {user.address.city}, {user.address.zipcode}
                  </p>
               </div>
               </div>
            </TabsContent>
         </Tabs>
         </CardContent>
      </Card>
   )
}
