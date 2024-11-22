import { auth } from '@/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = ['dashboard'];

export default async function middleware(request: NextRequest) {
	const session = await auth();

	const isProtected = protectedRoutes.some((route) =>
		request.nextUrl.pathname.startsWith(route)
	);

	// Check if session exist and in protected route.
	if (!session && isProtected) {
		// redirect to the origin url
		const absoluteUrl = new URL('/', request.nextUrl.origin);
		return NextResponse.redirect(absoluteUrl.toString());
	}
	// If everything passed, you can access the page.
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
