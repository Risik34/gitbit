import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    // async session({ session }) {
    //   console.log('Session', session);
    //   return session;
    // },
    // async jwt({ token }) {
    //   console.log('Token', token);
    //   return token;
    // },
  },
  ...authConfig,
});
