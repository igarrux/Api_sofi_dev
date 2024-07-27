import { User } from '../../../database/index.js'
import { ERRORS } from './messages/errors.js'
import { UploadPromise } from '../utils/multer/upload_prommise.js'
import { verifyCode } from './validations/verify_code.js'
import { Verifications } from '../../../database/model/verifications/verifications.js'
import { saveUpdateErrorHandler } from '../utils/save_update_error_handler/save_update_error_handler.js'

export const updateUser = async (req, res) => {
	if (!req.params.user_name)
		return res.status(400).send(ERRORS.USER_NAME_EMPTY)
	try {
		const { user_name } = req.params
		const { body } = await UploadPromise('profile_img', req, res)
		const verification = await Verifications.findOne({ user_name })
		if ((await verifyCode(body.code, verification, res)) != true) return
		const { _id, user_name: _, ...updateData } = body
		const user = await User.findOne({ user_name })
		Object.assign(user, updateData)
		await user.save()
		if (req.saveIMG) req.saveIMG()
	} catch (error) {
		saveUpdateErrorHandler(error, res)
	}
	res.status(201).send()
}
