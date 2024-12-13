import NextAuth from "next-auth";
import { Account, User as AuthUser, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ensure credentials are not null and have the expected shape
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password!
            );

            if (isPasswordCorrect) {
              // Explicitly return a User-compatible object
              return {
                id: user.id,
                email: user.email,
                // Only include fields that match the NextAuth User type
              };
            }
          }

          // Return null if authentication fails
          return null;
        } catch (err) {
          // Log the error and return null
          console.error("Authentication error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: AuthUser;
      account: Account | null;
      profile?: Profile;
    }) {
      // When using credentials provider, always return true if user exists
      if (account?.provider === "credentials") {
        return !!user;
      }

      // For other providers, you might want to add more specific logic
      return false;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
