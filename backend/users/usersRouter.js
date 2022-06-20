const usersRouter = require('express').Router()
const {
    getAllUsers,
    getUser,
    updateUser,
    addUser,
    deleteUser
} = require('./usersService');

const { validateId, checkRole } = require('../shared/middlewares')

const verifyUser = async (request, response, next) => {
    if(!await getUser(+request.params.id)) return response.status(404).end()
    else next()
}

usersRouter.get('/', checkRole('admin'), async (request, response) => {
    try {
        response.status(200).json(await getAllUsers())
    } catch (error) { 
        response.status(400).send(error)
    }
})


usersRouter.get('/:id', validateId, async (request, response) => {
    const id = +request.params.id
    const user = await getUser(id)
    if(!user) return response.status(404).end()
    else response.status(200).json(user)
})

usersRouter.put('/:id', validateId, verifyUser, checkRole('admin'), async (request, response) => {
    const id = +request.params.id
    const { username, address, email, role } = request.body
    const user = {
        id,
        username,
        address,
        email,
        role,
    }
    const updated = await updateUser(user)
    response.status(updated? 204 : 400).end()
})


usersRouter.delete('/:id', validateId, verifyUser, checkRole('admin'), async (request, response) => {
    const id = +request.params.id
    try {
        deleteUser(id)
        response.status(204).end()
    } catch (error) {
        response.status(400).send(error)
    }
})
usersRouter.post('/', checkRole('admin'), async (request, response) => {
    response.status(200).json(await addUser(request.body))
})

module.exports = { usersRouter }