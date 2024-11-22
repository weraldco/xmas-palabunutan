'use client';

import { login } from '@/action/auth';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function LoginGithub() {
	return (
		<div
			onClick={() => login('github')}
			className="flex flex-row gap-2 items-center bg-gray-950 px-4 py-2 rounded-lg hover:bg-gray-900 hover:scale-105 duration-200 cursor-pointer"
		>
			<FaGithub size={40} />
			<p>Login with Github</p>
		</div>
	);
}
