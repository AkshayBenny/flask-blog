'user client'

import ThumbUpLineIcon from 'remixicon-react/ThumbUpLineIcon'
import ThumbDownLineIcon from 'remixicon-react/ThumbDownLineIcon'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userAtom } from '@/state/recoil'

interface Comment {
	id: number
	comment: string
	date: string
	user_id: string | null
	user_name: string
}

export default function Comments() {
	const [commentsData, setCommentsData] = useState<Array<Comment> | any>()
	const [commentData, setCommentData] = useState<string | null>(null)
	const [recoilUser, setRecoilUser] = useRecoilState(userAtom)

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const csrfToken = localStorage.getItem('csrfToken')
		const token = localStorage.getItem('token') || recoilUser.token
		const userId = localStorage.getItem('userId')
		// Create a new date object
		const date = new Date()

		// Format the date
		const formattedDate = date.toLocaleDateString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
		const newComment: Comment = {
			id: Number(Math.random()),
			comment: commentData || '',
			date: String(formattedDate),
			user_id: userId,
			user_name: 'John Doe',
		}
		try {
			console.log(commentData, token)
			await axios.post(
				'http://127.0.0.1:5000/create_comment',
				{
					comment: commentData,
					user_id: Number(Math.random()),
					blog_id: Number(Math.random()),
				},
				{
					headers: {
						Authorization: `Bearer ${recoilUser.token || token}`,
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'X-CSRFToken': csrfToken,
					},
				}
			)
		} catch (error: any) {
			console.log(error.message)
		}
		setCommentsData([...commentsData, newComment])
	}

	// useEffect(() => {}, [commentsData.length])

	return (
		<div className='border-t mt-12 py-12'>
			<h2 className='italic font-bold pb-3'>Comments</h2>
			<form
				onSubmit={submitHandler}
				className='flex flex-col items-end justify-center '>
				<textarea
					value={commentData ? commentData : ''}
					onChange={(e: any) => setCommentData(e.target.value)}
					placeholder='Enter your comment here...'
					className='border rounded-md px-4 py-2 w-full'
				/>
				<button className='bg-blue-500 text-white h-full rounded-md px-4 py-2 hover:cursor-pointer hover:bg-blue-600 transition mt-4'>
					Comment
				</button>
			</form>
			<div>
				{commentsData?.map((comment: Comment) => {
					return (
						<div
							key={comment.id}
							className='border-b py-5'>
							<div className='flex items-center justify-start gap-2 pb-2'>
								<div className='h-[30px] w-[30px] rounded-full bg-blue-900'></div>
								<div>
									<p className='font-semibold text-sm'>
										{comment.user_name}
									</p>
									<p className='font-light text-xs '>
										{comment.date}
									</p>
								</div>
							</div>
							<p className='pb-4'>{comment.comment}</p>
							<div className='flex items-center justify-start gap-2 text-sm text-black'>
								<button className='group hover:cursor-pointer'>
									<ThumbUpLineIcon className='h-[16px] w-[16px] group-hover:text-blue-700 group-hover:scale-110 transition' />
								</button>
								<button className='group hover:cursor-pointer'>
									<ThumbDownLineIcon className='h-[16px] w-[16px] group-hover:text-red-600 group-hover:scale-110 transition ' />
								</button>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
