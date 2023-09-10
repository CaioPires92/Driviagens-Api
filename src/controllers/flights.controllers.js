import dayjs from 'dayjs'
import { db } from '../database/db.connection.js'

export async function createFlights(req, res) {
  const { origin, destination, date } = req.body

  try {
    const cityOrigin = await db.query(`SELECT * FROM cities WHERE id=$1`, [
      origin
    ])

    const citydestination = await db.query(`SELECT * FROM cities WHERE id=$1`, [
      destination
    ])

    if (cityOrigin.rowCount === 0 || citydestination.rowCount === 0) {
      return res
        .status(404)
        .send({ message: 'Cidade de origem ou destino não existe' })
    }

    if (cityOrigin.rows[0].id === citydestination.rows[0].id) {
      return res.status(409).send({
        message: 'a cidade de origem e destino não podem ser as mesmas'
      })
    }

    await db.query(
      `INSERT INTO flights (origin, destination, data) VALUES ($1, $2, $3);`,
      [origin, destination, date]
    )

    return res.status(201).json({ message: 'Voo criado com sucesso' })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getFlights(req, res) {
  res.send('flights')
}
