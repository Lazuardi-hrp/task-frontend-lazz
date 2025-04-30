import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"

export const metadata: Metadata = {
   title: "Settings | User Dashboard",
   description: "Manage your dashboard settings",
}

export default function SettingsPage() {
   return (
      <div className="space-y-6">
         <h1 className="text-3xl font-bold">Settings</h1>

         <Card>
         <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the dashboard looks and feels</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
               <div>
               <h3 className="font-medium">Theme</h3>
               <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
               </div>
               <ModeToggle />
            </div>
         </CardContent>
         </Card>

         <Card>
         <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>Information about this dashboard</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <div>
               <h3 className="font-medium">Version</h3>
               <p className="text-sm text-muted-foreground">1.0.0</p>
            </div>

            <div>
               <h3 className="font-medium">Technologies</h3>
               <ul className="text-sm text-muted-foreground list-disc list-inside">
               <li>Next.js</li>
               <li>TypeScript</li>
               <li>Tailwind CSS</li>
               <li>shadcn/ui</li>
               </ul>
            </div>

            <div>
               <h3 className="font-medium">API</h3>
               <p className="text-sm text-muted-foreground">Data provided by JSONPlaceholder</p>
            </div>
         </CardContent>
         </Card>
      </div>
   )
}
