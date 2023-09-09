import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { citiesSchema } from '../schemas/cities.schema.js'
import { createCities } from '../controllers/cities.controllers.js'

const citiesRouter = Router()

citiesRouter.post('/cities', validateSchema(citiesSchema), createCities)

export default citiesRouter
