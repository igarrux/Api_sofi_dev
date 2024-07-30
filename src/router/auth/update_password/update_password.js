import { User } from '../../../database/index.js'
import { verifyCode } from './validations/verify_code.js'
import { Verifications } from '../../../database/model/verifications/verifications.js'
import { saveUpdateErrorHandler } from '../utils/save_update_error_handler/save_update_error_handler.js'

export const updatePassword = async (req, res) => {
	try {
		const { user_name } = req.params

		//Verify the verificaton code
		const verification = await Verifications.findOne({ user_name })
		if ((await verifyCode(req.body.code, verification, res)) != true) return

		//Update the user
		const user = await User.findOne({ user_name })
		user.password = req.body.new_password
		await user.save()
	} catch (error) {
		saveUpdateErrorHandler(error, res)
	}
	res.status(201).send()
}
