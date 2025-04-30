"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface UserTablePaginationProps {
   currentPage: number
   totalItems: number
   itemsPerPage: number
   onPageChange: (page: number) => void
}

export function UserTablePagination({ currentPage, totalItems, itemsPerPage, onPageChange }: UserTablePaginationProps) {
   const totalPages = Math.ceil(totalItems / itemsPerPage)

   if (totalPages <= 1) {
      return null
   }

   const handlePrevious = () => {
      if (currentPage > 1) {
         onPageChange(currentPage - 1)
      }
   }

   const handleNext = () => {
      if (currentPage < totalPages) {
         onPageChange(currentPage + 1)
      }
   }

   // Generate page numbers to display
   const getPageNumbers = () => {
      const pages = []
      const maxPagesToShow = 5

      if (totalPages <= maxPagesToShow) {
         // Show all pages if there are fewer than maxPagesToShow
         for (let i = 1; i <= totalPages; i++) {
         pages.push(i)
         }
      } else {
         // Always show first page
         pages.push(1)

         // Calculate start and end of page range
         let start = Math.max(2, currentPage - 1)
         let end = Math.min(totalPages - 1, currentPage + 1)

         // Adjust if at the beginning or end
         if (currentPage <= 2) {
         end = Math.min(totalPages - 1, 4)
         } else if (currentPage >= totalPages - 1) {
         start = Math.max(2, totalPages - 3)
         }

         // Add ellipsis if needed
         if (start > 2) {
         pages.push("...")
         }

         // Add middle pages
         for (let i = start; i <= end; i++) {
         pages.push(i)
         }

         // Add ellipsis if needed
         if (end < totalPages - 1) {
         pages.push("...")
         }

         // Always show last page
         pages.push(totalPages)
      }

      return pages
   }

   return (
      <div className="flex items-center justify-between">
         <div className="text-sm text-muted-foreground">
         Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
         {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
         </div>

         <div className="flex items-center space-x-2">
         <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
         </Button>

         {getPageNumbers().map((page, index) =>
            typeof page === "number" ? (
               <Button
               key={index}
               variant={currentPage === page ? "default" : "outline"}
               size="icon"
               onClick={() => onPageChange(page)}
               >
               {page}
               </Button>
            ) : (
               <span key={index} className="px-2">
               {page}
               </span>
            ),
         )}

         <Button variant="outline" size="icon" onClick={handleNext} disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
         </Button>
         </div>
      </div>
   )
}
