import bcrypt from 'bcrypt'
export function hastPassword(next) {
	if (!this.isModified('password')) return next()
	const salt = bcrypt.genSaltSync(10)
	this.password = bcrypt.hashSync(this.password, salt)
	next()
}
