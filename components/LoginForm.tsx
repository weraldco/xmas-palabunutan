'use client';
import { getUserBySecretName, loginWithCreds } from '@/action/auth';
import bcrypt from 'bcryptjs';
import Link from 'next/link';
import React, { useState } from 'react';
import AuthButtn from './AuthButtn';

const LoginForm = () => {
	const [secretName, setSecretName] = useState('');
	const [password, setPassword] = useState('');

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setError('');
		e.preventDefault();
		setLoading(true);
		const form = new FormData();
		form.append('secretName', secretName);
		form.append('password', password);
		try {
			if (!secretName || !password) {
				setError('All fields are required!');
				setLoading(false);
			} else {
				const user = await getUserBySecretName(secretName);
				if (user === null) {
					setError('You are not register.');
					setLoading(false);
				} else {
					const isMatch = bcrypt.compareSync(
						password,
						user.hashedPassword as string
					);
					if (!isMatch) {
						setError('Incorrect password');
						setLoading(false);
					} else {
						loginWithCreds(form);
						setLoading(false);
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex justify-center items-center">
			<div className=" grid gap-4 w-[350px] md:w-[450px] ">
				<h1 className="text-2xl font-bold">Login Page</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<label htmlFor="secretName" className="text-sm text-gray-400">
							Secret Name
						</label>
						<input
							onChange={(e) => setSecretName(e.target.value)}
							value={secretName}
							id="secretName"
							name="secretName"
							type="text"
							placeholder="Enter your secretName.."
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
					<AuthButtn loading={loading}>Login</AuthButtn>
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
	);
};

export default LoginForm;
