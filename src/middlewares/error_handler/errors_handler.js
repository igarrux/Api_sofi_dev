import { logger } from '../../logger.js'
import { httpError } from '../../router/utils/mappers/http_errors.js'
import { ERRORS } from './messages/errors.js'

export const errorHandler = (error, req, res, next) => {
	if (error instanceof SyntaxError && error?.message?.includes('JSON')) {
		const errorMessage = ERRORS.INVALID_JSON + ': ' + error.message
		return httpError(400, errorMessage, 'json/syntaxError')(res)
	}
	if (error) {
		logger.Error(error)
		return httpError(400, error.message, 'unknown')(res)
	}
	next()
}
