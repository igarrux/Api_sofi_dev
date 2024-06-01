export const errorsMapper = (errors) => {
	return Object.values(errors).map((error) => ({
		path: error.path,
		message: error.message,
	}))
}
