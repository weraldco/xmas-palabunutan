'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';

export default function AuthButtn() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className="bg-teal-500 px-4 py-4 w-full rounded-full hover:bg-teal-400 hover:scale-105 active:bg-teal-300 duration-200 mt-2"
		>
			Login
		</button>
	);
}
