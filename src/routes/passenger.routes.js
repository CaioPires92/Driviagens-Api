import { Router } from 'express'
import {
  createPassengers,
  getPessengersTravels
} from '../controllers/passengers.controlles.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { passengersSchema } from '../schemas/passengers.schema.js'

const passengersRouter = Router()

passengersRouter.post('/passengers', validateSchema(passengersSchema), createPassengers)
passengersRouter.get('/passengers/travels', getPessengersTravels)

export default passengersRouter
