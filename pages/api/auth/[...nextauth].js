import NextAuth from "next-auth"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Auth0Provider from "next-auth/providers/auth0"
import { destroyCookie } from "nookies"

const prisma = new PrismaClient()


export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
   Auth0Provider({
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    issuer: process.env.AUTH0_ISSUER
    }),
  ]
  ,
  callbacks: {
    async signout(user) {
      await prisma.$disconnect()
      destroyCookie(null, "next-auth.session-token")
    }
    // ,
    // async session(session, user) {
    //   session.user.id = user.id
    //   return session
    // }
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user" // If set, new users will be directed here on first sign in
  },


})
