import { httpError } from '../../../utils/mappers/http_errors.js'
import { compare } from 'bcrypt'
import { ERRORS } from '../messages/errors.js'
export const verifyCode = async (code, dbUserData, res) => {
	const isValid = await compare(code, dbUserData.verification)
	if (!isValid) return httpError(401, ERRORS.VERIFICATION_INVALID)(res)
	return true
}
