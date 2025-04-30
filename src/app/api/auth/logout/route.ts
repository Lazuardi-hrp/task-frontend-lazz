// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
   const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
   });

   response.cookies.set("auth-token", "", {
      path: "/",
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
   });

   return response;
}
