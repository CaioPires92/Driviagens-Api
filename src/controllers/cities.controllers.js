import httpStatus from 'http-status'
import { citiesServices } from '../services/cities.service.js'

async function create(req, res) {
  const { name } = req.body

  await citiesServices.create(name)

  res.sendStatus(httpStatus.CREATED)
}

export const citiesController = { create }
