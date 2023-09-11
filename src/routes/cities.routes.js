import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { citiesSchema } from '../schemas/cities.schema.js'
import { citiesController } from '../controllers/cities.controllers.js'

const citiesRouter = Router()

citiesRouter.post('/cities', validateSchema(citiesSchema), citiesController.create)

export default citiesRouter
