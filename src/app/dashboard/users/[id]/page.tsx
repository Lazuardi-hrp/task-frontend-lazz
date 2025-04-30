import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getUserById, getPostsByUserId } from "@/lib/data"
import { UserDetail } from "@/components/users/user-detail"
import { UserPosts } from "@/components/users/user-posts"

type PageProps = {
   params: { id: string }
   searchParams: Record<string, string | string[] | undefined>
}

export async function generateMetadata({ params }: Awaited<PageProps>): Promise<Metadata> {
   const id = params.id;
   const userId = Number.parseInt(id);
   const user = await getUserById(userId);

   if (!user) {
      return { title: "User Not Found" };
   }

   return {
      title: `${user.name} | User Dashboard`,
      description: `View and edit details for ${user.name}`,
   };
}

export default async function UserPage({ params }: Awaited<PageProps>) {
   const id = params.id;
   const userId = Number.parseInt(id);

   const [user, posts] = await Promise.all([
      getUserById(userId),
      getPostsByUserId(userId),
   ]);

   if (!user) notFound();

   return (
      <div className="space-y-8">
         <UserDetail user={user} />
         <UserPosts posts={posts} />
      </div>
   );
}
