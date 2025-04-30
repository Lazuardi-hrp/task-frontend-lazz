import type { User } from "@/lib/types"

interface UserInfoTabProps {
   user: User
}

export function UserInfoTab({ user }: UserInfoTabProps) {
   return (
      <div className="grid gap-4">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
            <p className="text-base">{user.name}</p>
         </div>
         <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Username</h3>
            <p className="text-base">@{user.username}</p>
         </div>
         </div>

         <div>
         <h3 className="text-sm font-medium text-muted-foreground mb-1">Company</h3>
         <p className="text-base font-medium">{user.company.name}</p>
         <p className="text-sm text-muted-foreground">{user.company.catchPhrase}</p>
         <p className="text-sm text-muted-foreground">{user.company.bs}</p>
         </div>
      </div>
   )
}
