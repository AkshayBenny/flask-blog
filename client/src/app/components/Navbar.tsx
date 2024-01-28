'use client'

import { userAtom } from '@/state/recoil'
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export default function Navbar() {
	const [recoilUser, setRecoilUser] = useRecoilState(userAtom)
	console.log(recoilUser)

	const logoutHandler = async () => {
		const csrfToken = localStorage.getItem('csrfToken')
		try {
			await axios.post('http://127.0.0.1:5000/auth/logout', {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'X-CSRFToken': csrfToken,
				},
			})
			setRecoilUser({ name: '', email: '', token: '' })
			localStorage.removeItem('token')
			redirect('/')
		} catch (error: any) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		try {
			const token = localStorage.getItem('token')
			if (token) setRecoilUser({ name: '', email: '', token: token })
		} catch (error: any) {
			console.log(error.message)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<nav className='w-full bg-blue-500 px-12 text-base flex items-center gap-6 py-4 text-white'>
			<Link href='/'>Home</Link>
			{recoilUser.token && (
				<>
					<Link href='/create-blog'>Create Blog</Link>
					<button onClick={logoutHandler}>Logout</button>
				</>
			)}
			{!recoilUser.token && (
				<>
					<Link href='/login'>Login</Link>
					<Link href='/signup'>Sign Up</Link>
				</>
			)}
		</nav>
	)
}
