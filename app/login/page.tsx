import LoginForm from '@/components/LoginForm';
import LoginGithub from '@/components/LoginGithub';
import React from 'react';

export default function LoginPage() {
	return (
		<div className="flex justify-center items-center h-[60vh] flex-col">
			<LoginForm />
			{/* <LoginGithub /> */}
		</div>
	);
}
