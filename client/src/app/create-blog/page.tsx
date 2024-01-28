'use client'

import { userAtom } from '@/state/recoil'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

interface BlogData {
	title: string
	date: string
	data: string
}

export default function CreateBlogPage() {
	const [blogData, setBlogData] = useState<BlogData | null>(null)
	const [recoilUser, setRecoilUser] = useRecoilState(userAtom)
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setBlogData((prev) => ({
			...(prev ?? {
				data: '',
				title: '',
			}),
			date: String(new Date()),
		}))
		const userEmail = localStorage.getItem('email')
		if (!userEmail) return console.log('No user email found.')
		const csrfToken = localStorage.getItem('csrfToken')
		console.log(csrfToken)
		try {
			await axios.post(
				'http://127.0.0.1:5000/create_blog',
				{
					data: blogData?.data || '',
					title: blogData?.title || '',
					user_email: userEmail || recoilUser.email || '',
				},
				{
					headers: {
						Authorization: `Bearer ${recoilUser.token}`,
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'X-CSRFToken': csrfToken,
					},
				}
			)
			router.push('/')
		} catch (error: any) {
			console.log(error.message)
		}
	}
	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4 px-12'>
			<div>
				<label className='label'>
					<span className='text-base label-text'>Title</span>
				</label>
				<input
					type='text'
					placeholder='Enter title'
					className='w-full input input-bordered input-primary'
					value={blogData?.title || ''}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setBlogData((prev) => ({
							...(prev ?? {
								data: '',
								date: '',
							}),
							title: e.target.value,
						}))
					}
				/>
			</div>
			<div>
				<label className='label'>
					<span className='text-base label-text'>
						Enter your blog
					</span>
				</label>
				<textarea
					placeholder='Type here...'
					className='w-full input input-bordered input-primary py-2 h-full'
					rows={10}
					value={blogData?.data || ''}
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
						setBlogData((prev) => ({
							...(prev ?? {
								title: '',
								date: '',
							}),
							data: e.target.value,
						}))
					}
				/>
			</div>
			<button
				type='submit'
				className='btn btn-block btn-primary'>
				Create
			</button>
		</form>
	)
}
