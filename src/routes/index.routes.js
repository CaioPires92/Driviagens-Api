import { Router } from 'express'
import flightsRouter from './flights.routes.js'
import travelsRouter from './travels.routes.js'
import passengersRouter from './passenger.routes.js'
import citiesRouter from './cities.routes.js'

const router = Router()

router.use(citiesRouter)
router.use(flightsRouter)
router.use(passengersRouter)
router.use(travelsRouter)

export default router
