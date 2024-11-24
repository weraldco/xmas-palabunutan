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

export const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({ where: { id } });
		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};
export const getUserBySecretName = async (secretName: string) => {
	try {
		const user = await db.user.findUnique({
			where: { secretName },
		});
		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const loginWithCreds = async (formData: FormData) => {
	const rawFormData = {
		secretName: formData.get('secretName'),
		password: formData.get('password'),
		role: 'USER',
		redirectTo: '/',
	};
	try {
		await signIn('credentials', rawFormData);
	} catch (error) {
		console.log(error);
	} finally {
		revalidatePath('/dashboard');
		redirect('/dashboard');
	}
};

export const registerNewUser = async (formData: FormData) => {
	const hash = saltAndHashPassword(formData.get('password'));

	try {
		// check if email is existing
		const existingUser = await getUserBySecretName(
			formData.get('secretName') as string
		);

		if (existingUser) {
			console.log('User exist cannot register!');
			return null;
		} else {
			await db.user.create({
				data: {
					name: formData.get('fullname') as string,
					secretName: formData.get('secretName') as string,
					hashedPassword: hash,
					wishListOne: formData.get('wishlist1') as string,
					wishListTwo: formData.get('wishlist2') as string,
					wishListThree: formData.get('wishlist3') as string,
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
	console.log(session?.user?.secretName);
	if (session?.user?.secretName) {
		const allUsers = await db.user.findMany({
			where: {
				OR: [
					{
						picked: false,
					},
				],
				NOT: {
					secretName: session.user.secretName,
				},
			},
			select: {
				id: true,
				secretName: true,
				picked: true,
				youPicked: true,
			},
		});
		const userPool = allUsers.filter(
			(user) => user.youPicked != session.user?.secretName
		);

		const randomNum = Math.floor(Math.random() * userPool.length);
		const userPicked = userPool[randomNum]; // random pick from the fetch data in db

		await db.user.update({
			where: {
				secretName: session?.user?.secretName,
			},
			data: {
				youPicked: userPicked.secretName,
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

export const getPickedResult = async (secretName: string) => {
	try {
		const result = await db.user.findUnique({
			where: {
				secretName,
			},
		});
		return result;
	} catch (error) {
		console.log(error);
	}
};
