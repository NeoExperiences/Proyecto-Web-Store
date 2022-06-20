require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { usersRouter } = require('./users/usersRouter')
const { articlesRouter } = require('./articles/articlesRouter')
const { categoriesRouter } = require('./categories/categoriesRouter')
const { authenticationRouter } = require('./users/authenticationRouter')

const server = express()

server.use(cors())
server.use(express.json())


server.use('/articles', articlesRouter)
server.use('/categories', categoriesRouter)
server.use('/users', usersRouter)
server.use('/', authenticationRouter)

server.listen(process.env.PORT || 5000)