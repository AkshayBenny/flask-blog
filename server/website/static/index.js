function deleteBlog(blogId) {
	fetch('/delete-blog', {
		method: 'POST',
		body: JSON.stringify({ blogId: blogId }),
	})
		.then((res) => {
			window.location.href = '/'
		})
		.catch((error) => {
			console.log(error.message)
		})
}
