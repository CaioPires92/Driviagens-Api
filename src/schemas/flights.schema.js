import Joi from 'joi'
import dayjs from 'dayjs'

// Função de validação personalizada para datas no formato "dd-mm-yyyy"
const customDateValidator = (value, helpers) => {
  const date = dayjs(value, 'DD-MM-YYYY', true) // Parse da data no formato "dd-mm-yyyy"
  const currentDate = dayjs()

  if (!date.isValid()) {
    return helpers.message('Data no formato "dd-mm-yyyy" inválida')
  }

  if (date.isBefore(currentDate, 'day')) {
    return helpers.message('A data do voo deve ser maior do que a data atual')
  }

  return value // Data válida
}

export const flightSchema = Joi.object({
  origin: Joi.number().integer().min(1).required(),
  destination: Joi.number().integer().min(1).required(),
  date: Joi.string().custom(customDateValidator, 'custom validation').required()
})
