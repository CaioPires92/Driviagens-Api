import joiBase from 'joi'
import joiDate from '@joi/date'
import dayjs from 'dayjs'

const Joi = joiBase.extend(joiDate)

const customDateValidator = (value, helpers) => {
  const currentDate = dayjs()

  if (dayjs(value).isBefore(currentDate, 'day')) {
    return helpers.message('A data do voo deve ser maior do que a data atual')
  }

  return value
}

export const flightSchema = Joi.object({
  origin: Joi.number().integer().min(1).required(),
  destination: Joi.number().integer().min(1).required(),
  // date: Joi.string().custom(customDateValidator, 'custom validation').required()
  date: Joi.date()
    .format('DD-MM-YYYY')
    .custom(customDateValidator, 'custom validation')
    .required()
    .messages({
      'date.format': `"O formato da data de lançamento deve ser : DD-MM-AAAA"`,
      'any.required': `"O campo date deve ser obrigatorio."`
    })
})
