import { User } from '../../../database/index.js'
import { ERRORS } from './errors_messages/error.messages.js'
import { UploadPromise } from '../utils/multer/upload_prommise.js'
import { saveUpdateErrorHandler } from '../utils/save_update_error_handler/save_update_error_handler.js'

export const SingUp = async (req, res) => {
	if (!req.body) return res.status(400).send(ERRORS.BODY_EMPTY)
	try {
		const { body } = await UploadPromise('profile_img', req, res)
		const user = new User(body)
		await user.save()
		if (req.saveIMG) req.saveIMG()
	} catch (error) {
		saveUpdateErrorHandler(error, res)
	}
	res.status(201).send()
}
