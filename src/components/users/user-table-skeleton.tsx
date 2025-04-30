import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function UserTableSkeleton() {
   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
         <Skeleton className="h-10 w-[300px]" />
         <Skeleton className="h-5 w-[150px]" />
         </div>

         <div className="rounded-md border">
         <Table>
            <TableHeader>
               <TableRow>
               <TableHead>Name</TableHead>
               <TableHead>Username</TableHead>
               <TableHead>Email</TableHead>
               <TableHead>Company</TableHead>
               <TableHead className="text-right">Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {Array.from({ length: 10 }).map((_, index) => (
               <TableRow key={index}>
                  <TableCell>
                     <Skeleton className="h-5 w-[150px]" />
                  </TableCell>
                  <TableCell>
                     <Skeleton className="h-5 w-[100px]" />
                  </TableCell>
                  <TableCell>
                     <Skeleton className="h-5 w-[180px]" />
                  </TableCell>
                  <TableCell>
                     <Skeleton className="h-5 w-[120px]" />
                  </TableCell>
                  <TableCell className="text-right">
                     <Skeleton className="h-9 w-[70px] ml-auto" />
                  </TableCell>
               </TableRow>
               ))}
            </TableBody>
         </Table>
         </div>

         <div className="flex items-center justify-between">
         <Skeleton className="h-5 w-[200px]" />
         <div className="flex items-center space-x-2">
            {Array.from({ length: 5 }).map((_, index) => (
               <Skeleton key={index} className="h-9 w-9" />
            ))}
         </div>
         </div>
      </div>
   )
}
