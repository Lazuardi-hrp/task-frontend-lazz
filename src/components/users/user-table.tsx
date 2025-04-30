"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import type { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp, Search, ExternalLink, Mail } from "lucide-react"
import { UserTablePagination } from "./user-table-pagination"

interface UserTableProps {
   initialUsers: User[]
}

type SortField = "name" | "username" | "email" | "company.name"
type SortDirection = "asc" | "desc"

export function UserTable({ initialUsers }: UserTableProps) {
   const [searchQuery, setSearchQuery] = useState("")
   const [sortField, setSortField] = useState<SortField>("name")
   const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
   const [currentPage, setCurrentPage] = useState(1)
   const itemsPerPage = 10

   // Filter users based on search query
   const filteredUsers = useMemo(() => {
      return initialUsers.filter((user) => {
         const query = searchQuery.toLowerCase()
         return (
         user.name.toLowerCase().includes(query) ||
         user.username.toLowerCase().includes(query) ||
         user.email.toLowerCase().includes(query) ||
         user.company.name.toLowerCase().includes(query) ||
         user.phone.toLowerCase().includes(query)
         )
      })
   }, [initialUsers, searchQuery])

   // Sort users based on sort field and direction
   const sortedUsers = useMemo(() => {
      return [...filteredUsers].sort((a, b) => {
         let valueA, valueB

         // Handle nested fields like company.name
         if (sortField === "company.name") {
         valueA = a.company.name
         valueB = b.company.name
         } else {
         valueA = a[sortField]
         valueB = b[sortField]
         }

         if (valueA < valueB) {
         return sortDirection === "asc" ? -1 : 1
         }
         if (valueA > valueB) {
         return sortDirection === "asc" ? 1 : -1
         }
         return 0
      })
   }, [filteredUsers, sortField, sortDirection])

   // Paginate users
   const paginatedUsers = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage
      return sortedUsers.slice(startIndex, startIndex + itemsPerPage)
   }, [sortedUsers, currentPage, itemsPerPage])

   // Handle sort
   const handleSort = (field: SortField) => {
      if (field === sortField) {
         setSortDirection(sortDirection === "asc" ? "desc" : "asc")
      } else {
         setSortField(field)
         setSortDirection("asc")
      }
   }

   // Render sort indicator
   const renderSortIndicator = (field: SortField) => {
      if (sortField !== field) return null
      return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
   }

   return (
      <div className="space-y-4">
         <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
         <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
               type="search"
               placeholder="Search users..."
               className="w-full sm:w-[300px] pl-8"
               value={searchQuery}
               onChange={(e) => {
               setSearchQuery(e.target.value)
               setCurrentPage(1) // Reset to first page on search
               }}
            />
         </div>
         <div className="text-sm text-muted-foreground">Showing {filteredUsers.length} users</div>
         </div>

         <div className="rounded-md border">
         <Table>
            <TableHeader>
               <TableRow>
               <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                  <div className="flex items-center">
                     Name
                     {renderSortIndicator("name")}
                  </div>
               </TableHead>
               <TableHead className="cursor-pointer" onClick={() => handleSort("username")}>
                  <div className="flex items-center">
                     Username
                     {renderSortIndicator("username")}
                  </div>
               </TableHead>
               <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
                  <div className="flex items-center">
                     Email
                     {renderSortIndicator("email")}
                  </div>
               </TableHead>
               <TableHead className="cursor-pointer" onClick={() => handleSort("company.name")}>
                  <div className="flex items-center">
                     Company
                     {renderSortIndicator("company.name")}
                  </div>
               </TableHead>
               <TableHead className="text-right">Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {paginatedUsers.length > 0 ? (
               paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                     <TableCell className="font-medium">{user.name}</TableCell>
                     <TableCell>{user.username}</TableCell>
                     <TableCell>
                     <a href={`mailto:${user.email}`} className="flex items-center gap-1 hover:underline">
                        <Mail className="h-4 w-4" />
                        {user.email}
                     </a>
                     </TableCell>
                     <TableCell>{user.company.name}</TableCell>
                     <TableCell className="text-right">
                     <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/users/${user.id}`}>
                           <ExternalLink className="h-4 w-4 mr-1" />
                           View
                        </Link>
                     </Button>
                     </TableCell>
                  </TableRow>
               ))
               ) : (
               <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                     No users found.
                  </TableCell>
               </TableRow>
               )}
            </TableBody>
         </Table>
         </div>

         <UserTablePagination
         currentPage={currentPage}
         totalItems={filteredUsers.length}
         itemsPerPage={itemsPerPage}
         onPageChange={setCurrentPage}
         />
      </div>
   )
}
