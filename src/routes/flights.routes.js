import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { flightSchema } from '../schemas/flights.schema.js'
import { flightsControllers } from '../controllers/flights.controllers.js'

const flightsRouter = Router()

flightsRouter.post('/flights', validateSchema(flightSchema), flightsControllers.create)
flightsRouter.get('/flights', flightsControllers.find)

export default flightsRouter
