import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { LoginSchema } from './schema';
import { getUserByEmail } from './data/user';
import bcrypt from 'bcryptjs';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedData = LoginSchema.safeParse(credentials);
        if (!parsedData.success) {
          return null;
        }

        const { email, password } = parsedData.data;

        const existingUser = await getUserByEmail(email);
        if (!existingUser || !existingUser.password) return null;

        const passwordMatch = await bcrypt.compare(
          password,
          existingUser.password,
        );
        if (passwordMatch) return existingUser;
      },
    }),
    GitHub({
      clientId:process.env.GITHUB_CLIENT_ID,
      clientSecret:process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
