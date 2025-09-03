// @ts-expect-error
import { DefaultSession, DefaultUser } from "next-auth"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: number;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: number;
    role?: string;
  }
}

