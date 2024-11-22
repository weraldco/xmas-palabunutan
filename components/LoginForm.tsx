'use client';
import { loginWithCreds } from '@/action/auth';
import { checkEmail } from '@/utils/helper';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AuthButtn from './AuthButtn';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setError('');
		e.preventDefault();

		const rawFormData = {
			email: email,
			password: password,
			role: 'USER',
			redirect: false,
		};

		if (!email || !password) {
			setError('All fields are required');
		} else {
			if (checkEmail(email) === false) {
				setError('Not a valid email address');
			} else {
				const response = await signIn('credentials', rawFormData);
				if (!!response?.error) {
					setError('Incorrect email or password!');
				} else {
					router.push('dashboard');
				}
			}
		}
	};
	return (
		<div>
			<div className="flex justify-center items-center">
				<div className="min-w-[400px] grid gap-4">
					<h1 className="text-2xl font-bold">Login Page</h1>
					<form
						onSubmit={handleSubmit}
						// action={loginWithCreds}
						className="flex flex-col gap-4"
					>
						<div className="flex flex-col gap-1">
							<label htmlFor="email" className="text-sm text-gray-400">
								Email address
							</label>
							<input
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								id="email"
								name="email"
								type="text"
								placeholder="Enter your email address.."
								className="px-4 py-2 rounded-full text-gray-800"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="password" className="text-sm text-gray-400">
								Password
							</label>
							<input
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								type="password"
								id="password"
								name="password"
								placeholder="Enter your password."
								className="px-4 py-2 rounded-full text-gray-800"
							/>
						</div>
						<AuthButtn />
					</form>
					<span className="text-red-400">{error && error}</span>
					<span>
						Not yet register,{' '}
						<Link
							className="text-pink-400 font-semibold hover:text-pink-300 duration-200"
							href="/register"
						>
							Sign up here!
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
