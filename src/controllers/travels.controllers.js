import httpStatus from 'http-status'
import { travelService } from '../services/travels.service.js'

async function create(req, res) {
  const { passengerId, flightId } = req.body

  await travelService.create(passengerId, flightId)
  return res.sendStatus(httpStatus.CREATED)
}

export const travelsController = { create }
