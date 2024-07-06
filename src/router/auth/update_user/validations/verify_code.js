import { httpError } from '../../../utils/mappers/http_errors.js'
import { compare } from 'bcrypt'
import { ERRORS } from '../messages/errors.js'
import { Verifications } from '../../../../database/model/verifications/verifications.js'

export const verifyCode = async (code, dbUserData, res) => {
	if (!dbUserData?.verification) {
		return httpError(401, ERRORS.VERIFICATION_INVALID)(res)
	}
	const isValid = await compare(code, dbUserData.verification)
	if (!isValid) return httpError(401, ERRORS.VERIFICATION_INVALID)(res)
	await Verifications.deleteMany({ user_name: dbUserData.user_name })
	return true
}
