'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DeleteBin7LineIcon from 'remixicon-react/DeleteBin7LineIcon'
import Comments from '../components/Comments'

interface BlogPost {
	title: string
	data: string
	date: string
	id: number
	user_id: number
}

export default function BlogPage({ params }: { params: { blogId: string } }) {
	const [blog, setBlog] = useState<BlogPost | null>(null)
	const router = useRouter()

	const deleteHandler = async () => {
		const userEmail = localStorage.getItem('email')
		const token = localStorage.getItem('token')
		const csrfToken = localStorage.getItem('csrfToken')
		try {
			await axios.post(
				'http://127.0.0.1:5000/delete_blog',
				{
					blog_id: params.blogId,
					user_email: userEmail,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
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

	useEffect(() => {
		const fetchBlogById = async () => {
			try {
				const { data } = await axios.get(
					`http://127.0.0.1:5000/${params.blogId}`
				)
				setBlog(data.data)
				console.log('blogData>>>', data.data)
			} catch (error: any) {
				console.log(error.message)
			}
		}
		fetchBlogById()
	}, [params.blogId])

	if (!blog) {
		return <div>Loading...</div>
	}

	return (
		<main className='m-12'>
			<div className='flex items-center justify-start gap-2 mb-6'>
				<div className='flex items-center justify-between w-full'>
					<div>
						<h2 className='font-bold'>{blog?.title},</h2>
						<p className='font-normal italic text-sm'>
							by JRR Tolkien
						</p>
					</div>
					<button
						onClick={deleteHandler}
						className='text-red-500 border-2 rounded border-red-500 p-1'>
						<DeleteBin7LineIcon />
					</button>
				</div>
			</div>
			<p className='text-sm leading-6'>{blog?.data}</p>
			<Comments />
		</main>
	)
}
