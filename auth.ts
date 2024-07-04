import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"
import { getWorkspacesByUserId } from "@/data/workspace"

export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    // error: "/auth/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
  
        if (token.email) {
          session.user.email = token.email;
        }

        if (token.workspaces) {
          session.user.workspaces = token.workspaces;
        }

        if (token.currentWorkspaceId) {
          session.user.currentWorkspaceId = token.currentWorkspaceId;
        }

        session.user.name = token.name;
        session.user.image = token.picture;
      }
      
      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const dbUser = await getUserById(token.sub);

      if (!dbUser) return token;

      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      token.currentWorkspaceId = dbUser.currentWorkspaceId;

      // 获取 workspace 信息并添加到 token
      const workspaces = await getWorkspacesByUserId(token.sub);
      token.workspaces = workspaces;

      return token;
    },
  },
  ...authConfig,
  // debug: process.env.NODE_ENV !== "production"
})


