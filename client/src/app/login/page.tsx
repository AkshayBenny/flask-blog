'use client'

import { userAtom } from '@/state/recoil'
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

interface UserData {
	email: string
	password: string
}

export default function LoginPage() {
	const [user, setUser] = useState<UserData | null>(null)
	const [recoilUser, setRecoilUser] = useRecoilState(userAtom)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const { data } = await axios.post(
				'http://127.0.0.1:5000/auth/token',
				{
					email: user?.email,
					password: user?.password,
				},
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			)
			if (data && data.access_token) {
				sessionStorage.setItem('token', `${data.access_token}`)
				localStorage.setItem('token', `${data.access_token}`)
				sessionStorage.setItem('email', `${user?.email || ''}`)
				localStorage.setItem('email', `${user?.email || ''}`)
				setRecoilUser({
					name: '',
					email: user?.email || '',
					token: data.access_token,
				})
			}
		} catch (error: any) {
			console.log(error.message)
		}
	}
	return (
		<div className='relative flex flex-col justify-center h-screen overflow-hidden'>
			<div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
				<h1 className='text-3xl font-semibold text-center text-purple-700'>
					Login
				</h1>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					<div>
						<label className='label'>
							<span className='text-base label-text'>Email</span>
						</label>
						<input
							type='text'
							placeholder='Email Address'
							className='w-full input input-bordered input-primary'
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) =>
								setUser((prev) => ({
									...(prev ?? {
										password: '',
									}),
									email: e.target.value,
								}))
							}
						/>
					</div>
					<div>
						<label className='label'>
							<span className='text-base label-text'>
								Password
							</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered input-primary'
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => {
								setUser((prev) => ({
									...(prev ?? {
										email: '',
									}),
									password: e.target.value,
								}))
							}}
						/>
					</div>

					<div>
						<button
							type='submit'
							className='btn btn-block btn-primary'>
							Login
						</button>
					</div>
					<span>
						Dont have an account ?
						<Link
							href='/signup'
							className='text-blue-600 hover:text-blue-800 hover:underline'>
							Sign up
						</Link>
					</span>
				</form>
			</div>
		</div>
	)
}
