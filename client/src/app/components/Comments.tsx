import ThumbUpLineIcon from 'remixicon-react/ThumbUpLineIcon'
import ThumbDownLineIcon from 'remixicon-react/ThumbDownLineIcon'
import { useEffect, useState } from 'react'

interface Comment {
	id: number
	comment: string
	date: string
	user_id: number
	user_name: string
}

const comments = [
	{
		id: 1,
		comment: 'This is an insightful blog post. Thanks for sharing!',
		date: '12 May 2014',
		user_id: 101,
		user_name: 'John Doe',
	},
	{
		id: 2,
		comment: 'Really enjoyed reading this. Looking forward to more posts.',
		date: '12 May 2014',
		user_id: 102,
		user_name: 'Jane Smith',
	},
	{
		id: 3,
		comment: 'Great post! I learned a lot from this.',
		date: '12 May 2014',
		user_id: 103,
		user_name: 'Alice Johnson',
	},
]
export default function Comments() {
	const [commentsData, setCommentsData] = useState<Array<Comment>>(comments)
	const [commentData, setCommentData] = useState<string | null>(null)
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// Create a new date object
		const date = new Date()

		// Format the date
		const formattedDate = date.toLocaleDateString('en-US', {
			weekday: 'short', // Short name of the day of the week.
			year: 'numeric', // Numeric year.
			month: 'short', // Short name of the month.
			day: 'numeric', // Numeric day of the month.
		})
		const newComment: Comment = {
			id: Number(Math.random()),
			comment: commentData || '',
			date: String(formattedDate),
			user_id: Number(Math.random()),
			user_name: 'John Doe',
		}
		setCommentsData([...commentsData, newComment])
	}

	useEffect(() => {}, [commentsData.length])

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
				{commentsData.map((comment: Comment) => {
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
