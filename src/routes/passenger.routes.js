import { Router } from 'express'

import { validateSchema } from '../middlewares/validateSchema.js'
import { passengersSchema } from '../schemas/passengers.schema.js'
import { passengerControllers } from '../controllers/passengers.controllers.js'

const passengersRouter = Router()

passengersRouter.post(
  '/passengers',
  validateSchema(passengersSchema),
  passengerControllers.create
)
passengersRouter.get('/passengers/travels', passengerControllers.find)

export default passengersRouter
