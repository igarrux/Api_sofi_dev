import { ALLOWED_TYPES } from '../mimes/allowed_types.js'

const VALID_TYPES = ALLOWED_TYPES.join(', ')
export const ERRORS = {
	INVALID_FORMAT: `Formato de archivo no valido. Solo se admiten: ${VALID_TYPES}`,
	USER_ID_REQUIRED: 'Hubo un problema con la sesión del usuario.',
	LIMIT_FILE_SIZE: 'El archivo es demasiado grande',
	UPLOAD_GENERAL_ERROR: 'Hubo un problema al subir el archivo',
	DEST_PROBLEM: 'Hubo un problema con el destino del archivo',
}
