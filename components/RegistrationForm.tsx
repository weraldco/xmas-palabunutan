'use client';
import { getUserBySecretName, registerNewUser } from '@/action/auth';
import Link from 'next/link';
import React, { useState } from 'react';
import AuthButtn from './AuthButtn';

const RegistrationForm = () => {
	const [fullname, setFullname] = useState('');
	const [secretName, setSecretName] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [wishlist, setWishlist] = useState({
		first: '',
		second: '',
		third: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true);
		setError('');
		e.preventDefault();

		if (
			!fullname ||
			!secretName ||
			!password ||
			!repeatPassword ||
			!wishlist.first
		) {
			setLoading(false);
			setError('All fields are required');
		} else {
			const checkUser = await getUserBySecretName(secretName);
			if (checkUser) {
				setLoading(false);
				setError('User already exist!');
			} else {
				if (password !== repeatPassword) {
					setLoading(false);
					setError("Password didn't match!");
				} else {
					const form = new FormData();
					form.append('fullname', fullname);
					form.append('secretName', secretName);
					form.append('password', password);
					form.append('wishlist1', wishlist.first);
					form.append('wishlist2', wishlist.second);
					form.append('wishlist3', wishlist.third);

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
							Secret name{' '}
							<span className="text-xs italic">
								(this is considered as you login username)
							</span>
						</label>
						<input
							onChange={(e) => setSecretName(e.target.value)}
							value={secretName}
							name="username"
							type="text"
							placeholder="ex. Zorro "
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
					<div className="flex flex-col gap-2">
						<label htmlFor="" className="text-sm text-gray-400">
							You wishlist{' '}
							<span className="text-xs italic">
								(second and third option is optional. you can put a
								shoppee/lazada link or image link.)
							</span>
						</label>

						{Object.entries(wishlist).map(([key, value]) => (
							<div key={key} className="w-full">
								<p className="text-xs italic text-gray-500">{key} option</p>

								<input
									onChange={(e) =>
										setWishlist((prev) => ({ ...prev, [key]: e.target.value }))
									}
									value={value}
									name="wishlist"
									type="text"
									placeholder={`Your ${key} wishlist option..`}
									className="px-4 py-2 rounded-full text-gray-800 w-full"
								/>
							</div>
						))}
					</div>

					<AuthButtn loading={loading}>Register</AuthButtn>
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
