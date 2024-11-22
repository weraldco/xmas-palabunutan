'use client';
import { logout } from '@/action/auth';
import React from 'react';

export default function LogoutButton() {
	return (
		<button
			onClick={() => logout()}
			className="text-sm p-2 bg-gray-400 rounded-lg cursor-pointer"
		>
			Logout
		</button>
	);
}
