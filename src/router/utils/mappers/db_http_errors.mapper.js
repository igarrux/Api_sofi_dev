export const dbHttpError = (errors, code) => {
	const response = Object.values(errors).map((error) => ({
		path: error.path,
		message: error.message,
	}))
	return (res) => res.status(code).json(response)
}
