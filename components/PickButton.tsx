'use client';
import { pickMonitoMonita } from '@/action/auth';
import React from 'react';

export default function PickButton() {
	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		pickMonitoMonita();
	}
	return (
		<div>
			<button
				onClick={handleClick}
				className="bg-teal-500 text-white text-xl px-8 py-6 rounded-full hover:bg-teal-400 duration-200 active:bg-teal-500"
			>
				Pick Monito/Monita
			</button>
			{/* <button
				disabled
				className="bg-gray-500 text-white  text-xl px-8 py-6 rounded-full opacity-50"
			>
				Pick Monito/Monita
			</button> */}
		</div>
	);
}
