const isCookieSecure = process.env.IS_COOKIE_SECURE == 'true'
export const cookieConfig = {
	httpOnly: true,
	secure: isCookieSecure,
	sameSite: 'none',
}