import NextAuth from "next-auth";
import type { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { IUser } from "../../../../interfaces/userInterface";

const RIWI_HOST = process.env.RIWI_HOST;

declare module "next-auth" {
  interface User {
    accessToken?: string;
    username?: string;
    phone?: string;
  }
  interface Session {
    user: User & {
      accessToken?: string;
      username?: string;
      phone?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    username?: string;
    phone?: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const { user, access_token } = await login(credentials.username, credentials.password);
          return {
            id: user._id,
            email: user.email,
            name: user.name,
            accessToken: access_token,
            username: user.username,
            phone: user.phone,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | undefined }): Promise<JWT> {
      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.username;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }): Promise<any> {
      session.user.accessToken = token.accessToken;
      session.user.username = token.username;
      session.user.phone = token.phone;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

async function login(username: string, password: string): Promise<{ user: IUser; access_token: string }> {
  const response = await fetch(`${RIWI_HOST}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Login failed:", response.status, errorData);
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();
  if (!data.user || !data.access_token) {
    console.error("Invalid response data:", data);
    throw new Error("Invalid response from server");
  }

  return data;
}

export { authOptions };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };