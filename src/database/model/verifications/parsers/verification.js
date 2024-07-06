import bcrypt from 'bcrypt'
export function hashVerification(next) {
	if (!this.isModified('verification')) return next()
	const salt = bcrypt.genSaltSync(10)
	this.verification = bcrypt.hashSync(this.verification, salt)
	next()
}
