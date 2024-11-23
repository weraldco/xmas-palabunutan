import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
	const session = await auth();
	return (
		<div className="flex flex-1 flex-row justify-between">
			<div className="flex w-full place-content-end">
				{!session?.user ? (
					<div className="flex gap-4">
						<Link
							className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-400 duration-200"
							href="/login"
						>
							Login
						</Link>
						<Link
							className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-400 duration-200"
							href="/register"
						>
							Register
						</Link>
					</div>
				) : (
					<div className="flex flex-row gap-4 items-center text-sm">
						<div className="flex flex-row gap-4 items-center">
							<span>Hi, {session?.user.name}</span>
							{session?.user.image ? (
								<Image
									src={session?.user.image || ''}
									alt={session?.user.name || 'User avatar'}
									width={30}
									height={30}
									className="rounded-full"
								/>
							) : null}
						</div>
						<LogoutButton />
					</div>
				)}
			</div>
		</div>
	);
}
