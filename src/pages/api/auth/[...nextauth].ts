import prismaClient from "@/lib/prismaClient";
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
            clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
            authorization: { params: { scope: "identify" } },

            profile(profile) {
                console.log("🚀 ~ file: [...nextauth].ts ~ line 24 ~ profile ~ profile", profile)
                
                return {
                    id: profile.id.toString(),
                    name: profile.username,
                    username: `${profile.username}#${profile.discriminator}`,
                    email: profile.email,
                    image: profile.avatar
                        ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
                        : null,
                };
            },
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
        async jwt({ token, account }) {
            console.log(
                "🚀 ~ file: [...nextauth].ts ~ line 63 ~ jwt ~ account",
                account
            );
            console.log(
                "🚀 ~ file: [...nextauth].ts ~ line 63 ~ jwt ~ token",
                token
            );
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },

        async session({ session, token, user }) {
            const userBd = await prismaClient.user.findUnique({
                where: {
                    id: token.sub,
                },
            });

            if (userBd) {
                session.user.username = String(userBd?.username);
            }

            if (token.sub) {
                session.user.id = token.sub;
            }

            return {
                ...session,
                user: {
                    ...session.user,
                },
            };
        },
    },
} as NextAuthOptions;

export default NextAuth(authOptions);
