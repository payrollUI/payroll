import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// Simple file-based user storage (replace with database in production)
const USERS_FILE = path.join(process.cwd(), 'users.json');

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  company: string;
  createdAt: string;
}

// Helper function to read users from file
function getUsers(): User[] {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
      company?: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id: string;
    company?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const users = getUsers();
          const user = users.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());
          
          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            company: user.company
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: { 
        params: { 
          scope: 'profile email openid' 
        } 
      },
      issuer: 'https://www.linkedin.com/oauth',
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
        token.company = (user as any).company;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      if (token.id) {
        session.user.id = token.id;
        session.user.company = token.company;
      }
      return session;
    }
  }
}; 