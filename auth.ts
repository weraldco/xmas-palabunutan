import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import { getUserById } from './action/auth';
import db from './db';

export type ExtendedUser = DefaultSession['user'] & {
	secretName: string;
};

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser;
	}
}

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth({
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	callbacks: {
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (token.secretName && session.user) {
				session.user.secretName = token.secretName as string;
			}
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const user = await getUserById(token.sub);
			if (!user) return token;

			token.secretName = user.secretName;

			return token;
		},
	},
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
		Credentials({
			name: 'Credentials',
			credentials: {
				secretName: {
					label: 'secretName',
					type: 'text',
					placeholder: 'secret name',
				},
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				if (!credentials || !credentials.secretName || !credentials.password) {
					return null;
				}
				const secretName = credentials.secretName as string;

				let user: any = await db.user.findUnique({
					where: {
						secretName,
					},
				});
				if (!user) {
					throw new Error('User not existing');
				}
				return user;
			},
		}),
	],
});
