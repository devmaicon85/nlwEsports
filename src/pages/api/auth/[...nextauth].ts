import prismaClient from "@/lib/prismaClient";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/admin",
        signOut: "/login",
        error: "/login",
    },

    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_ID),
            clientSecret: String(process.env.GOOGLE_SECRET),
        }),
        GitProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            // profile(profile) {
            //     return {
            //         id: profile.id.toString(),
            //         name: profile.name || profile.login,
            //         username: profile.login,
            //         email: profile.email,
            //         image: profile.avatar_url,
            //     };
            // },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "E-mail",
                    type: "text",
                    placeholder: "seuemail@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !email.includes("@") || !password) {
                    throw new Error("E-mail ou Senha inválidos");
                }

                try {
                    const user = await prismaClient.user.findUnique({
                        where: {
                            email,
                        },
                    });
                    if (!user) {
                        throw new Error("Usuário não encontrado");
                    }
                    if (!user.password) {
                        throw new Error("Usuário sem senha definida");
                    }

                    const checkPassword = await compare(
                        password,
                        user.password
                    );

                    if (checkPassword) {
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        };
                    } else {
                        throw new Error("Senha inválida");
                    }
                } catch (error) {
                    throw new Error(`${error}`);
                }
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
