export const httpError = (code, message, path) => {
	const response = [{ path, message }]
	return (res) => res.status(code).json(response)
}
