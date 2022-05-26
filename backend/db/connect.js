const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const database = process.env.DB_DATABASE

const Sequelize = require('sequelize')
const db = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${database}`)

require('./models')(db, Sequelize.DataTypes)

module.exports = { db }