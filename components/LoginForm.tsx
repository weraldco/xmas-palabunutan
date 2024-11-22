'use client';
import { loginWithCreds } from '@/action/auth';
import { checkEmail } from '@/utils/helper';
import Link from 'next/link';
import React, { useState } from 'react';
import AuthButtn from './AuthButtn';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setError('');
		e.preventDefault();
		if (!email || !password) {
			setError('All fields are required');
		} else {
			const form = new FormData();
			form.append('email', email);
			form.append('password', password);

			loginWithCreds(form);
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
