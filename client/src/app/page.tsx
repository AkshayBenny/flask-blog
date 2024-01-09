'use client'

import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
	const [blogs, setBlogs] = useState([])

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
	}, [blogs])
	return (
		<main className='space-y-[24px] m-12'>
			<h2 className='font-semibold text-xl'>Blogs</h2>
			{blogs &&
				blogs.map((blog: any) => {
					return (
						<div
							key={blog.id}
							className='border border-black rounded px-6 py-2 group'>
							<Link
								href={'/' + blog.id}
								className='w-full'>
								<p className='group-hover:cursor-pointer group-hover:underline transition font-medium text-blue-500'>
									{blog.title}
								</p>
								<p className='truncate'>{blog.data}</p>
							</Link>
						</div>
					)
				})}
		</main>
	)
}
