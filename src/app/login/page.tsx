import type { Metadata } from "next"
import LoginForm from "../../components/login-form"

export const metadata: Metadata = {
   title: "Login | User Dashboard",
   description: "Login to access the dashboard",
}

export default function LoginPage() {
   return (
      <div className="flex min-h-screen items-center justify-center bg-background">
         <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
         <div className="text-center">
            <h1 className="text-2xl font-bold">Login to Dashboard</h1>
            <p className="text-muted-foreground mt-2">Enter your credentials to continue</p>
         </div>
         <LoginForm />
         </div>
      </div>
   )
}
