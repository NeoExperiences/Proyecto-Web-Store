const ordersRouter = require('express').Router()

const { verifyUserToken } = require('../shared/middlewares')

const { addOrder, getOrder, getAllOrders } = require('./ordersService')

ordersRouter.get('/', async (request, response) => response.status(200).json(await getAllOrders()))
ordersRouter.get('/:id', async (request, response) =>response.status(200).json(await getOrder(+request.params.id)))
ordersRouter.put('/:id', async (request, response) => response.send('ok'))
ordersRouter.delete('/:id', async (request, response) => response.send('ok'))
ordersRouter.post('/', verifyUserToken, async (request, response) => {
    const { products } = request.body
    const user = request.userInfo
    console.log(user)
    if(products?.length)
        response.status(200).json(await addOrder({ user, products }))
    else {
        response.status(400).end()
    }
})

module.exports = { ordersRouter }