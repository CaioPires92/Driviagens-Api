import { passengerService } from "../services/passengers.service.js"

async function create(req, res) {
  const { firstName, lastName } = req.body

  try {
    await passengerService.createPassenger(firstName, lastName)
    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

async function find(req, res) {
  const { name } = req.query
  const maxResults = 10

  try {
    const passengers = await passengerService.findPassengersByName(
      name,
      maxResults
    )
    res.json(passengers)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

export const passengerControllers = { create, find }
