'use client'

import { RecoilRoot } from 'recoil'
import './globals.css'
import Link from 'next/link'
import Navbar from './components/Navbar'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className='bg-slate-100'>
				<RecoilRoot>
					<Navbar />
					{children}
				</RecoilRoot>
			</body>
		</html>
	)
}
