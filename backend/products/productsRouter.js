const productsRouter = require('express').Router()
const {
    getAllProducts,
    getProduct,
    updateProduct,
    addProduct,
    deleteProduct
} = require('./productsService');

const { validateId } = require('../shared/middlewares')
const { checkRole } = require('../shared/middlewares')

const verifyProduct = async (request, response, next) => {
    if(!await getProduct(+request.params.id)) return response.status(404).end()
    else next()
}

productsRouter.get('/', async (request, response) => {
    response.status(200).json(await getAllProducts())
})

productsRouter.get('/:id', validateId, async (request, response) => {
    const id = +request.params.id
    const product = await getProduct(id)
    if(!product) return response.status(404).end()
    else response.status(200).json(product)
})

productsRouter.put('/:id', validateId, verifyProduct, checkRole('admin'), async (request, response) => {
    const id = +request.params.id
    const { name, price, stock, category } = request.body
    const product = {
        id,
        name,
        price,
        stock: stock || 0,
        category
    }
    const updated = await updateProduct(product)
    response.status(updated? 204 : 400).end()
})


productsRouter.delete('/:id', validateId, verifyProduct, checkRole('admin'), async (request, response) => {
    const id = +request.params.id
    try {
        deleteProduct(id)
        response.status(204).end()
    } catch (error) {
        response.status(400).send(error)
    }
})
productsRouter.post('/', checkRole('admin'), async (request, response) => {
    response.status(200).json(await addProduct(request.body))
})

module.exports = { productsRouter }