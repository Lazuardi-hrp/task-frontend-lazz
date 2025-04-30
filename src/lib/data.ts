import type { User, Post } from "./types"

// Cache for data fetching
let usersCache: User[] | null = null
let postsCache: Post[] | null = null
let lastFetchTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function getUsers(): Promise<User[]> {
   // Check if we have cached data that's still valid
   const now = Date.now()
   if (usersCache && now - lastFetchTime < CACHE_TTL) {
      return usersCache
   }

   try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
         next: { revalidate: 3600 }, // Revalidate every hour
      })

      if (!response.ok) {
         throw new Error("Failed to fetch users")
      }

      const users: User[] = await response.json()

      // Update cache
      usersCache = users
      lastFetchTime = now

      return users
   } catch (error) {
      console.error("Error fetching users:", error)
      // Return cached data if available, otherwise empty array
      return usersCache || []
   }
}

export async function getPosts(): Promise<Post[]> {
   // Check if we have cached data that's still valid
   const now = Date.now()
   if (postsCache && now - lastFetchTime < CACHE_TTL) {
      return postsCache
   }

   try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
         next: { revalidate: 3600 }, // Revalidate every hour
      })

      if (!response.ok) {
         throw new Error("Failed to fetch posts")
      }

      const posts: Post[] = await response.json()

      // Update cache
      postsCache = posts
      lastFetchTime = now

      return posts
   } catch (error) {
      console.error("Error fetching posts:", error)
      // Return cached data if available, otherwise empty array
      return postsCache || []
   }
}

export async function getUserById(id: number): Promise<User | null> {
   try {
      // Try to get from cache first
      const users = await getUsers()
      const cachedUser = users.find((user) => user.id === id)

      if (cachedUser) {
         return cachedUser
      }

      // If not in cache, fetch directly
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
         next: { revalidate: 3600 },
      })

      if (!response.ok) {
         if (response.status === 404) {
         return null
         }
         throw new Error("Failed to fetch user")
      }

      return await response.json()
   } catch (error) {
      console.error(`Error fetching user ${id}:`, error)
      return null
   }
}

export async function getPostsByUserId(userId: number): Promise<Post[]> {
   try {
      // Try to get from cache first
      const posts = await getPosts()
      const userPosts = posts.filter((post) => post.userId === userId)

      if (userPosts.length > 0) {
         return userPosts
      }

      // If not in cache, fetch directly
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
         next: { revalidate: 3600 },
      })

      if (!response.ok) {
         throw new Error("Failed to fetch user posts")
      }

      return await response.json()
   } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error)
      return []
   }
}

export async function updateUser(id: number, userData: Partial<User>): Promise<User | null> {
   try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
         method: "PATCH",
         headers: {
         "Content-Type": "application/json",
         },
         body: JSON.stringify(userData),
      })

      if (!response.ok) {
         throw new Error("Failed to update user")
      }

      const updatedUser = await response.json()

      // Update cache if it exists
      if (usersCache) {
         usersCache = usersCache.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
      }

      return updatedUser
   } catch (error) {
      console.error(`Error updating user ${id}:`, error)
      return null
   }
}
