'use client'

import axios from 'axios'
import { useState } from 'react'

interface UserData {
	name: string
	email: string
	password: string
}

export default function SignUpPage() {
	const [user, setUser] = useState<UserData | null>(null)
	
	const handleSubmit = async() => {
		try {
			const {data} = await axios.post('http://127.0.0.1:5000/v2/token', )
		} catch (error) {
			
		}
	}
	return (
		<div className='relative flex flex-col justify-center h-screen overflow-hidden'>
			<div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
				<h1 className='text-3xl font-semibold text-center text-purple-700'>
					Create a new account
				</h1>
				<form onSubmit={handleSubmit} className='space-y-4'>
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
									...(prev ?? { email: '', password: '' }),
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
									...(prev ?? { name: '', password: '' }),
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
						/>
					</div>
					<div>
						<button className='btn btn-block btn-primary'>
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
