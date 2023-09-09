import { db } from '../database/db.connection.js'

export async function createPassengers(req, res) {
  const { firstName, lastName } = req.body

  try {
    await db.query(
      `INSERT INTO passengers (firstName, lastName) VALUES ($1, $2)`,
      [firstName, lastName]
    )

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getPessengersTravels(req, res) {
  res.send('/passengers/travels')
}
