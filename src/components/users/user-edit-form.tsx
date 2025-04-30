"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface UserEditFormProps {
   user: User
   onSuccess: () => void
}

const userEditSchema = z.object({
   name: z.string().min(2, "Name must be at least 2 characters"),
   username: z.string().min(3, "Username must be at least 3 characters"),
   email: z.string().email("Invalid email address"),
   phone: z.string().min(1, "Phone is required"),
   website: z.string().min(1, "Website is required"),
   company: z.object({
      name: z.string().min(1, "Company name is required"),
      catchPhrase: z.string().optional(),
      bs: z.string().optional(),
   }),
})

type UserEditFormValues = z.infer<typeof userEditSchema>

export function UserEditForm({ user, onSuccess }: UserEditFormProps) {
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)
   const [success, setSuccess] = useState(false)

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<UserEditFormValues>({
      resolver: zodResolver(userEditSchema),
      defaultValues: {
         name: user.name,
         username: user.username,
         email: user.email,
         phone: user.phone,
         website: user.website,
         company: {
         name: user.company.name,
         catchPhrase: user.company.catchPhrase,
         bs: user.company.bs,
         },
      },
   })

   const onSubmit = async (data: UserEditFormValues) => {
      setIsLoading(true)
      setError(null)
      setSuccess(false)

      try {
         const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
         })

         if (!response.ok) {
         throw new Error("Failed to update user")
         }

         setSuccess(true)

         // In a real app, we would update the cache here
         // For this demo, we'll just wait a moment and then call onSuccess
         setTimeout(() => {
         onSuccess()
         }, 1500)
      } catch (err) {
         setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         {error && (
         <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
         </Alert>
         )}

         {success && (
         <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>User updated successfully!</AlertDescription>
         </Alert>
         )}

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register("name")} disabled={isLoading} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
         </div>

         <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register("username")} disabled={isLoading} />
            {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
         </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} disabled={isLoading} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
         </div>

         <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} disabled={isLoading} />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
         </div>
         </div>

         <div className="space-y-2">
         <Label htmlFor="website">Website</Label>
         <Input id="website" {...register("website")} disabled={isLoading} />
         {errors.website && <p className="text-sm text-destructive">{errors.website.message}</p>}
         </div>

         <div className="space-y-2">
         <Label htmlFor="company.name">Company Name</Label>
         <Input id="company.name" {...register("company.name")} disabled={isLoading} />
         {errors.company?.name && <p className="text-sm text-destructive">{errors.company.name.message}</p>}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="space-y-2">
            <Label htmlFor="company.catchPhrase">Catch Phrase</Label>
            <Input id="company.catchPhrase" {...register("company.catchPhrase")} disabled={isLoading} />
         </div>

         <div className="space-y-2">
            <Label htmlFor="company.bs">Business Strategy</Label>
            <Input id="company.bs" {...register("company.bs")} disabled={isLoading} />
         </div>
         </div>

         <Button type="submit" disabled={isLoading}>
         {isLoading ? "Saving..." : "Save Changes"}
         </Button>
      </form>
   )
}
