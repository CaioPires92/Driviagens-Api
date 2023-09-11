import dayjs from 'dayjs'
import { db } from '../database/db.connection.js'

async function create(req, res) {
  const { origin, destination, date } = req.body || req.params

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
      `INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3);`,
      [origin, destination, date]
    )

    return res.status(201).json({ message: 'Voo criado com sucesso' })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

async function find(req, res) {
  try {
    const { origin, destination, smallerDate, biggerDate } = req.query

    // Validação de datas usando Joi (lembre-se de definir seu schema de validação)
    // Se a validação falhar, você pode retornar um erro 422 aqui

    // Montar a consulta SQL com base nos parâmetros
    let query = `
      SELECT flights.id, cities_origin.name AS origin, cities_destination.name AS destination, flights.date
      FROM flights
      INNER JOIN cities AS cities_origin ON flights.origin = cities_origin.id
      INNER JOIN cities AS cities_destination ON flights.destination = cities_destination.id
      WHERE 1=1`

    const params = []

    if (origin && destination) {
      // Quando ambos origin e destination estão presentes
      query += ' AND cities_origin.name = $1 AND cities_destination.name = $2'
      params.push(origin, destination)
    } else if (origin) {
      // Quando apenas origin está presente
      query += ' AND cities_origin.name = $1'
      params.push(origin)
    } else if (destination) {
      // Quando apenas destination está presente
      query += ' AND cities_destination.name = $1'
      params.push(destination)
    }
    
    if (smallerDate && biggerDate) {
      query += ' AND flights.date BETWEEN $3 AND $4'
      params.push(smallerDate, biggerDate)
    }

    // Ordenar por data
    query += ' ORDER BY flights.date'

    // Executar a consulta no banco de dados
    const result = await db.query(query, params)

    const flights = result.rows.map(row => ({
      id: row.id,
      origin: row.origin,
      destination: row.destination,
      date: dayjs(row.date).format('DD-MM-YYYY') // Formatar a data aqui
    }))

    res.json(flights)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

export const flightsControllers = { create, find }
