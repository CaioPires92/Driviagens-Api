import Joi from 'joi'

export const travelsSchema = Joi.object({
  passengerId: Joi.number().integer().min(1).required(),
  flightId: Joi.number().integer().min(1).required()
})
