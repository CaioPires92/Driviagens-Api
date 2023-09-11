import { errors } from '../errors/errors.js'

export function validateSchema(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false })

    if (validation.error) {
      let errorMessage = ''
      validation.error.details.forEach(
        det => (errorMessage += det.message + ' ')
      )

      // mudar tratamento de erros
      throw errors.joi(errorMessage)
    }

    next()
  }
}
