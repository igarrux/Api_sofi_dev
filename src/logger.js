import { createLogger, format, transports } from 'winston'

class Logger {
	Error = (error, message) => {
		if (message) {
			this.#log.error(
				new Error(`📛${error.name} ${message} ${error.message}`)
			)
		} else {
			this.#log.error(`📛${error.name} ${error.message}`)
		}
	}
	#log = createLogger({
		format: format.combine(
			format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			format.errors({ stack: true }),
			format.printf((info) => {
				if (info.stack) {
					return ` 
                    \n 📃 ${info.stack}  \
                    \n 🕝 ${info.timestamp} ⚠️ ${info.level} \
                    \n ✉️ ${info.message}`
				}
				return `
                \n 🕝 ${info.timestamp} ⚠️ ${info.level} \
                \n ✉️ ${info.message}`
			})
		),
		transports: [
			new transports.File({
				filename: 'logs/error.log',
				level: 'error',
			}),
		],
	})
} 

export const logger = new Logger()
