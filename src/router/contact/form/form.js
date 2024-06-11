import { logger } from '../../../logger.js'
import { contactSendEmail } from './utils/contact_send_email.js'
import { ValidateContactForm } from './validations/contact_form.js'

export const ContactForm = async (req, res) => {
	try {
		const isBodyValid = ValidateContactForm(req, res)
		if (isBodyValid != true) return
		contactSendEmail(req, res).catch(console.log)
		res.status(204).send()
	} catch (error) {
		logger.Error(error)
		res.status(500).send()
	}
}
