const categoriesRouter = require('express').Router()
const {
    getAllCategories
} = require('./categoriesService');

categoriesRouter.get('/', async (request, response) => {
    response.status(200).json(await getAllCategories())
})


module.exports = { categoriesRouter }