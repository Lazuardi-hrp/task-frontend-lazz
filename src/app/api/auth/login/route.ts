import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const TOKEN_EXPIRY = 60 * 60 * 24 // 24 hours in seconds

export async function POST(request: Request) {
   try {
      const { username, password } = await request.json()

      // Mock authentication - in a real app, you would validate against a database
      if (username !== "testuser" || password !== "testpass") {
         return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
      }

      // Generate JWT token using jose
      const secretKey = new TextEncoder().encode(JWT_SECRET)
      const token = await new SignJWT({
         id: "1",
         username,
         name: "Test User",
         role: "admin",
      })
         .setProtectedHeader({ alg: "HS256" })
         .setIssuedAt()
         .setExpirationTime(Math.floor(Date.now() / 1000) + TOKEN_EXPIRY)
         .sign(secretKey)

      // Set JWT as an HTTP-only cookie
      const cookieStore = await cookies()
      cookieStore.set("auth-token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         maxAge: 60 * 60 * 24, // 1 day
         path: "/",
         sameSite: "strict",
      })

      return NextResponse.json({ success: true })
   } catch (error) {
      console.error("Login error:", error)
      return NextResponse.json({ message: "Internal server error" }, { status: 500 })
   }
}
