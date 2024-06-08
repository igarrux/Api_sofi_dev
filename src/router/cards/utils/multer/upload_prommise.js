import { upload } from './upload.js'

export const UploadPromise = (name, req, res) => {
	return new Promise((resolve, reject) => {
		upload.single(name)(req, res, (err) => {
			if (err) return reject(err)
			resolve(req)
		})
	})
}
