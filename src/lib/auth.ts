import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';

const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

console.log('[AUTH INIT] adminUsername loaded:', !!adminUsername);
console.log('[AUTH INIT] adminPassword loaded:', !!adminPassword);
console.log('[AUTH INIT] nextAuthSecret loaded:', !!nextAuthSecret);

if (!adminUsername || !adminPassword) {
  throw new Error(
    'Missing ADMIN_USERNAME or ADMIN_PASSWORD environment variables'
  );
}

if (!nextAuthSecret) {
  throw new Error('Missing NEXTAUTH_SECRET environment variable');
}

export const authOptions: NextAuthOptions = {
  secret: nextAuthSecret,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const username = credentials?.username?.trim();
        const password = credentials?.password;

        if (!username || !password) {
          return null;
        }

        if (username !== adminUsername) {
          return null;
        }

        const passwordMatch = adminPassword.startsWith('$2')
          ? await bcryptjs.compare(password, adminPassword)
          : password === adminPassword;

        if (!passwordMatch) {
          return null;
        }

        return {
          id: 'admin',
          name: 'Admin',
          email: 'admin@regent.global',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as typeof session.user & { id?: string; role?: string }).id =
          token.id as string;
        (session.user as typeof session.user & { id?: string; role?: string }).role =
          token.role as string;
      }
      return session;
    },
  },
};