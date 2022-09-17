import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/login",
    },

    providers: [
      
        DiscordProvider({
            clientId: String(process.env.DISCORD_CLIENT_ID),
            clientSecret: String(process.env.DISCORD_CLIENT_SECRET)
          }),
       
    ],

    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true,
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days * 2
        updateAge: 24 * 60 * 60, // 24 hours
    },
    // authoptions: {
    //     useSecureCookies: false,
    // },

    debug: process.env.NODE_ENV === "development",

    events: {
        async signIn() {},
        async signOut() {},
        async createUser() {},
        async updateUser() {},
        async linkAccount() {},
        async session() {},
    },

    callbacks: {
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                },
            };
        },
    },
} as NextAuthOptions;

export default NextAuth(authOptions);
