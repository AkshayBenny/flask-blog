export const fetchCsrfToken = async () => {
	const response = await fetch('http://127.0.0.1:5000/auth/get-csrf-token')
	const data = await response.json()
	return data.csrf_token
}
