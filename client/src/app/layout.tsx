'use client'

import { RecoilRoot } from 'recoil'
import './globals.css'
import Link from 'next/link'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { fetchCsrfToken } from '@/utils/fetchCSRFToken'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	useEffect(() => {
		const fetchTokens = async () => {
			// Fetch the csrf token and store to local storage
			try {
				const csrfToken = await fetchCsrfToken()
				localStorage.setItem('csrfToken', csrfToken)
			} catch (error: any) {
				console.log('Error retrieving CSRF token:' + error.message)
			}
		}

		fetchTokens()
	}, [])

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
