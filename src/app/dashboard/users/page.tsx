import type { Metadata } from "next"
import { Suspense } from "react"
import { getUsers } from "@/lib/data"
import { UserTable } from "@/components/users/user-table"
import { UserTableSkeleton } from "@/components/users/user-table-skeleton"

export const metadata: Metadata = {
   title: "Users | User Dashboard",
   description: "Manage and view all users",
}

export default async function UsersPage() {
   const users = await getUsers()

   return (
      <div className="space-y-6">
         <h1 className="text-3xl font-bold">Users</h1>
         <Suspense fallback={<UserTableSkeleton />}>
         <UserTable initialUsers={users} />
         </Suspense>
      </div>
   )
}
