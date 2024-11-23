'use client';
import { registerNewUser } from '@/action/auth';
import { checkEmail } from '@/utils/helper';
import Link from 'next/link';
import React, { useState } from 'react';

const RegistrationForm = () => {
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setError('');
		e.preventDefault();

		if (!fullname || !email || !password || !repeatPassword) {
			setError('All fields are required');
		} else {
			if (!checkEmail(email)) {
				setError('Not a valid email address.');
			} else {
				if (password !== repeatPassword) {
					setError("Password didn't match!");
				} else {
					const form = new FormData();
					form.append('fullname', fullname);
					form.append('email', email);
					form.append('password', password);

					registerNewUser(form);

					console.log('success');
				}
			}
		}
	};

	return (
		<div className="flex justify-center items-center ">
			<div className="min-w-[400px] grid gap-4">
				<h1 className="text-2xl font-bold">Registration</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<label htmlFor="" className="text-sm text-gray-400">
							Fullname
						</label>
						<input
							onChange={(e) => setFullname(e.target.value)}
							value={fullname}
							name="fullname"
							type="text"
							placeholder="ex. Werald Opolento"
							className="px-4 py-2 rounded-full text-gray-800"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="" className="text-sm text-gray-400">
							Email address
						</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							name="email"
							type="text"
							placeholder="ex. email@example.com"
							className="px-4 py-2 rounded-full text-gray-800"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="" className="text-sm text-gray-400">
							Password
						</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							name="password"
							type="password"
							placeholder="Your password"
							className="px-4 py-2 rounded-full text-gray-800"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="" className="text-sm text-gray-400">
							Repeat Password
						</label>
						<input
							onChange={(e) => setRepeatPassword(e.target.value)}
							value={repeatPassword}
							name="repeatPassword"
							type="password"
							placeholder="Repeat your password"
							className="px-4 py-2 rounded-full text-gray-800"
						/>
					</div>
					<button
						type="submit"
						className="bg-teal-500 px-4 py-4 w-full rounded-full  hover:bg-teal-400 hover:scale-105 active:bg-teal-300 duration-200 mt-2"
					>
						Register
					</button>
				</form>
				<span className="text-red-400">{error && error}</span>
				<span>
					Already registered?{' '}
					<Link
						className="text-pink-400 font-semibold hover:text-pink-300 duration-200"
						href="/login"
					>
						Sign in here.
					</Link>
				</span>
			</div>
		</div>
	);
};

export default RegistrationForm;
