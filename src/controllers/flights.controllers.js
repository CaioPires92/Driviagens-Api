import { flightsService } from '../services/flights.service.js'

async function create(req, res) {
  const { origin, destination, date } = req.body || req.params

  await flightsService.create(origin, destination, date)

  return res.status(201).json({ message: 'Voo criado com sucesso' })
}

async function find(req, res) {
  const { origin, destination, smallerDate, biggerDate } = req.query

  const flights = await flightsService.find(origin, destination, smallerDate, biggerDate)

  res.json(flights)
}

export const flightsControllers = { create, find }
