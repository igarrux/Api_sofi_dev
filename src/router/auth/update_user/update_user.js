import { User } from '../../../database/index.js'
import { ERRORS } from './messages/errors.js'
import { UploadPromise } from '../utils/multer/upload_prommise.js'
import { saveUpdateErrorHandler } from '../utils/save_update_error_handler/save_update_error_handler.js'
import { updateData } from './utils/update_data/update_data.js'
import { updateDataMapper } from './utils/mappers/update_data.mapper.js'
export const updateUser = async (req, res) => {
	if (!req.params.user_name)
		return res.status(400).send(ERRORS.USER_NAME_EMPTY)
	try {
		const { user_name } = req.params
		// Save the new image
		const { body } = await UploadPromise('profile_img', req, res)

		//Update the user
		const user = await User.findOne({ user_name })
		updateData(user, updateDataMapper(body))
		user.updatedAt = Date().now()
		await user.save()
		if (req.saveIMG) req.saveIMG()
	} catch (error) {
		saveUpdateErrorHandler(error, res)
	}
	res.status(201).send()
}
