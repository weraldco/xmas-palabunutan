'use server';

import { auth, signIn, signOut } from '@/auth';
import db from '@/db';
import { saltAndHashPassword } from '@/utils/helper';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const login = async (provider: string) => {
	await signIn(provider, { redirectTo: '/' });
	revalidatePath('/');
};

export const logout = async () => {
	await signOut({ redirectTo: '/' });
	revalidatePath('/');
};

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({
			where: { email },
		});
		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const loginWithCreds = async () => {
	// const rawFormData = {
	// 	email: formData.get('email'),
	// 	password: formData.get('password'),
	// 	role: 'USER',
	// 	redirectTo: '/',
	// };
	console.log('Logging in...');
	const allUser = await db.user.findMany();
	return allUser;
	// const existingUser = await getUserByEmail(formData.get('email') as string);
	// console.log(existingUser);
	// try {
	// 	await signIn('credentials', rawFormData);
	// } catch (error) {
	// 	console.log(error);
	// } finally {
	// 	revalidatePath('/dashboard');
	// 	redirect('/dashboard');
	// }
};

export const registerNewUser = async (formData: FormData) => {
	const hash = saltAndHashPassword(formData.get('password'));

	try {
		// check if email is existing
		const existingEmail = await getUserByEmail(formData.get('email') as string);

		if (existingEmail) {
			console.log('User exist cannot register!');
			return null;
		} else {
			await db.user.create({
				data: {
					name: formData.get('fullname') as string,
					email: formData.get('email') as string,
					hashedPassword: hash,
				},
			});
		}
	} catch (error) {
		console.log('Something error, while registering new.');
	} finally {
		revalidatePath('/login');
		redirect('/dashboard');
	}
};

export const pickMonitoMonita = async () => {
	const session = await auth();
	console.log(session);
	// Get all the users except you
	console.log(session?.user?.email);
	if (session?.user?.email) {
		const allUsers = await db.user.findMany({
			where: {
				OR: [
					{
						picked: false,
					},
				],
				NOT: {
					email: session.user.email,
				},
			},
			select: {
				id: true,
				email: true,
				picked: true,
				youPicked: true,
			},
		});
		const userPool = allUsers.filter(
			(user) => user.youPicked != session.user?.email
		);

		const randomNum = Math.floor(Math.random() * userPool.length);
		const userPicked = userPool[randomNum]; // random pick from the fetch data in db

		await db.user.update({
			where: {
				email: session?.user?.email,
			},
			data: {
				youPicked: userPicked.email,
			},
		});
		await db.user.update({
			where: {
				id: userPicked.id,
			},
			data: {
				picked: true,
			},
		});
		revalidatePath('/dashboard');
	}
};

export const getPickedResult = async (email: string) => {
	try {
		const result = await db.user.findUnique({
			where: {
				email,
			},
		});
		return result;
	} catch (error) {
		console.log(error);
	}
};
