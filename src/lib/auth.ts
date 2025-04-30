import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export type User = {
   id: string
   username: string
   name: string
   role: string
}

export type Session = {
   user: User
}

export async function getSession(): Promise<Session | null> {
   const cookieStore = await cookies()
   const token = cookieStore.get("auth-token")?.value

   if (!token) {
      return null
   }

   try {
      const secretKey = new TextEncoder().encode(JWT_SECRET)
      const { payload } = await jwtVerify(token, secretKey)

      return {
         user: payload as User,
      }
   } catch (error) {
      console.error("Session verification failed:", error)
      return null
   }
}
