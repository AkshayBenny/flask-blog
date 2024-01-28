'use client'

import { userAtom } from '@/state/recoil'
import { fetchCsrfToken } from '@/utils/fetchCSRFToken'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

interface UserData {
	name: string
	email: string
	password1: string
	password2: string
}

export default function SignUpPage() {
	const [user, setUser] = useState<UserData | null>(null)
	const [recoilUser, setRecoilUser] = useRecoilState(userAtom)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (user?.password1 !== user?.password2)
			setErrorMessage('Passwords do not match')
		const csrfToken = localStorage.getItem('csrfToken')
		try {
			const { data } = await axios.post(
				'http://127.0.0.1:5000/auth/sign_up',
				{
					email: user?.email,
					name: user?.name,
					password1: user?.password1,
					password2: user?.password2,
				},
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'X-CSRFToken': csrfToken,
					},
				}
			)
			if (data && data.access_token) {
				sessionStorage.setItem('token', `${data.access_token}`)
				localStorage.setItem('token', `${data.access_token}`)
				localStorage.setItem('email', `${user?.email || ''}`)
				localStorage.setItem('userEmail', `${data.user_email}`)
				localStorage.setItem('userName', `${data.name}`)
				localStorage.setItem('userId', `${data.user_id}`)
				setRecoilUser({
					name: user?.name || '',
					email: user?.email || '',
					token: data.access_token,
				})
				router.push('/')
			}
		} catch (error: any) {
			console.log(error.message)
		}
	}
	return (
		<div className='relative flex flex-col justify-center h-screen overflow-hidden'>
			<div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
				<h1 className='text-3xl font-semibold text-center text-purple-700'>
					Create a new account
				</h1>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					<div>
						<label className='label'>
							<span className='text-base label-text'>Name</span>
						</label>
						<input
							type='text'
							placeholder='Name'
							className='w-full input input-bordered input-primary'
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) =>
								setUser((prev) => ({
									...(prev ?? {
										email: '',
										password1: '',
										password2: '',
									}),
									name: e.target.value,
								}))
							}
						/>
					</div>
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
										name: '',
										password1: '',
										password2: '',
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
										name: '',
										email: '',
										password2: '',
									}),
									password1: e.target.value,
								}))
								setErrorMessage(null)
							}}
						/>
					</div>
					<div>
						<label className='label'>
							<span className='text-base label-text'>
								Confirm Password
							</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered input-primary'
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => {
								setUser((prev) => ({
									...(prev ?? {
										name: '',
										email: '',
										password1: '',
									}),
									password2: e.target.value,
								}))
								setErrorMessage(null)
							}}
						/>
					</div>
					{errorMessage && (
						<div
							role='alert'
							className='alert alert-error'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='stroke-current shrink-0 h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
							<span>{errorMessage}</span>
						</div>
					)}
					<div>
						<button
							type='submit'
							className='btn btn-block btn-primary'>
							Sign Up
						</button>
					</div>
					<span>
						Already have an account ?
						<Link
							href='login'
							className='text-blue-600 hover:text-blue-800 hover:underline'>
							Login
						</Link>
					</span>
				</form>
			</div>
		</div>
	)
}
