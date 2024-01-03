'use client'

import axios from 'axios'
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
		<div className='space-y-[24px]'>
			{blogs &&
				blogs.map((blog: any) => {
					return (
						<div key={blog.id}>
							<p>{blog.data}</p>
						</div>
					)
				})}
		</div>
	)
}
