import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className + ' ' + 'bg-slate-100'}>
				<nav className='w-full bg-blue-500 px-12 text-base flex items-center gap-6 py-4 text-white'>
					<Link href='/'>Home</Link>
					<Link href='/logout'>Logout</Link>
					<Link href='/login'>Login</Link>
					<Link href='/signup'>SignUp</Link>
				</nav>
				{children}
			</body>
		</html>
	)
}
