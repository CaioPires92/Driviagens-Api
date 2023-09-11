import { Router } from 'express'
import { passengersControllers } from '../controllers/passengers.controlles.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { passengersSchema } from '../schemas/passengers.schema.js'

const passengersRouter = Router()

passengersRouter.post('/passengers', validateSchema(passengersSchema), passengersControllers.create)
passengersRouter.get('/passengers/travels', passengersControllers.find)

export default passengersRouter
