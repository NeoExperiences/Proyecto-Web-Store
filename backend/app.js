require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { usersRouter } = require('./users/usersRouter')
const { productsRouter } = require('./products/productsRouter')
const { articlesRouter } = require('./articles/articlesRouter')
const { ordersRouter } = require('./orders/ordersRouter')
const { authenticationRouter } = require('./users/authenticationRouter')

const server = express()

server.use(cors())
server.use(express.json())

server.use('/products', productsRouter)
server.use('/articles', articlesRouter)
server.use('/users', usersRouter)
server.use('/orders', ordersRouter)
server.use('/', authenticationRouter)

server.listen(process.env.PORT || 5000)