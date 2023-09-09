import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { flightSchema } from '../schemas/flights.schema.js'
import { createFlights, getFlights } from '../controllers/flights.controllers.js'

const flightsRouter = Router()

flightsRouter.post('/flights', validateSchema(flightSchema), createFlights)
flightsRouter.get('/flights', getFlights)

export default flightsRouter
