export const Logout = (req, res) => {
	res.cookie('session', '', { expires: new Date(0) })
    res.status(204).send()
}
