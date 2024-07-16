const isCookieSecure = process.env.IS_COOKIE_SECURE == 'true'
export const cookieConfig = {
	httpOnly: true,
	secure: isCookieSecure,
	sameSite: 'flex',
	signed: true,
	maxAge: 1000 * 60 * 60 * 24 * 90,
}
