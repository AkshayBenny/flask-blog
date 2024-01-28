'use client'

import { fetchCsrfToken } from '@/utils/fetchCSRFToken'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface BlogPost {
	title: string
	data: string
	date: string
	id: number
	user_id: number
}

export default function Home() {
	const [blogs, setBlogs] = useState<BlogPost[]>([])

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const { data } = await axios.get('http://127.0.0.1:5000')
				setBlogs(data.blogs)
			} catch (error: any) {
				console.log(error.message)
			}
		}
		fetchBlogs()
	}, [])
	return (
		<main className='space-y-[24px] m-12'>
			<h2 className='font-semibold text-xl'>Blogs</h2>
			<div className='grid grid-cols-2 gap-3'>
				{blogs &&
					blogs.map((blog: any) => {
						return (
							<div
								key={blog.id}
								className='border border-black rounded px-6 py-2 group'>
								<Link
									href={`/${blog.id}`}
									className='w-full'>
									<p className='group-hover:cursor-pointer group-hover:underline transition font-medium text-blue-500'>
										{blog.title}
									</p>
									<p className='truncate'>{blog.data}</p>
								</Link>
							</div>
						)
					})}
			</div>
		</main>
	)
}
