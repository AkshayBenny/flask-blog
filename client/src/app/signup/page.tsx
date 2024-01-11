'use client'

import axios from 'axios'
import { useState } from 'react'

interface UserData {
	name: string
	email: string
	password1: string
	password2: string
}

export default function SignUpPage() {
	const [user, setUser] = useState<UserData | null>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const { data } = await axios.post(
				'http://127.0.0.1:5000/v2/token',
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
					},
				}
			)
			console.log(data)
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
							) =>
								setUser((prev) => ({
									...(prev ?? {
										name: '',
										email: '',
										password2: '',
									}),
									password1: e.target.value,
								}))
							}
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
							) =>
								setUser((prev) => ({
									...(prev ?? {
										name: '',
										email: '',
										password1: '',
									}),
									password2: e.target.value,
								}))
							}
						/>
					</div>
					<div>
						<button
							type='submit'
							className='btn btn-block btn-primary'>
							Sign Up
						</button>
					</div>
					<span>
						Already have an account ?
						<a
							href='#'
							className='text-blue-600 hover:text-blue-800 hover:underline'>
							Login
						</a>
					</span>
				</form>
			</div>
		</div>
	)
}