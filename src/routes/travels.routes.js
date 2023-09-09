import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { travelsSchema } from '../schemas/travels.schema.js'
import { createTravels } from '../controllers/travels.controllers.js'

const travelsRouter = Router()

travelsRouter.post('/travels', validateSchema(travelsSchema), createTravels)

export default travelsRouter
