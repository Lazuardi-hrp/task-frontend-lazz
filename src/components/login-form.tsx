"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const loginSchema = z.object({
   username: z.string().min(1, "Username is required"),
   password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
   const router = useRouter()
   const [error, setError] = useState<string | null>(null)
   const [isLoading, setIsLoading] = useState(false)

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
   })

   const onSubmit = async (data: LoginFormValues) => {
      setIsLoading(true)
      setError(null)

      try {
         const response = await fetch("/api/auth/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
         })

         if (!response.ok) {
         const errorData = await response.json()
         throw new Error(errorData.message || "Login failed")
         }

         router.push("/dashboard")
         router.refresh()
      } catch (err) {
         setError(err instanceof Error ? err.message : "Login failed")
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

         <div className="space-y-2">
         <Label htmlFor="username">Username</Label>
         <Input id="username" placeholder="Enter your username" {...register("username")} disabled={isLoading} />
         {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
         </div>

         <div className="space-y-2">
         <Label htmlFor="password">Password</Label>
         <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            disabled={isLoading}
         />
         {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
         </div>

         <Button type="submit" className="w-full outline" disabled={isLoading}>
         {isLoading ? "Logging in..." : "Login"}
         </Button>

         <div className="text-center text-sm text-muted-foreground">
         <p>Demo credentials:</p>
         <p>Username: testuser | Password: testpass</p>
         </div>
      </form>
   )
}
