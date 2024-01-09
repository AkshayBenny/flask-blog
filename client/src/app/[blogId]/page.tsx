'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

interface BlogPost {
	title: string
	data: string
	date: string
	id: number
	user_id: number
}

export default function BlogPage({ params }: { params: { blogId: string } }) {
	const [blog, setBlog] = useState<BlogPost | null>(null)

	useEffect(() => {
		const fetchBlogById = async () => {
			try {
				const { data } = await axios.get(
					`http://127.0.0.1:5000/${params.blogId}`
				)
				setBlog(data.data)
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
			<div className='flex items-center justify-start gap-12 mb-6'>
				<h2 className='font-bold'>{blog?.title}</h2>
				<h2 className='font-thin italic text-sm'>By JRR Tolkien</h2>
			</div>
			<p className='text-sm leading-6'>{blog?.data}</p>
		</main>
	)
}