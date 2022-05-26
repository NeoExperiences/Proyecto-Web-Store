const authenticationRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const {
    registerUser,
    checkCredentials
} = require('./authenticationService'); 

const { setUserInfo } = require('../shared/middlewares');

authenticationRouter.post('/register', async (request, response) => {
    const { username, email, address, password } = request.body
    if (username && email && address && password){
        const {createdUser, error} = await registerUser(request.body)
        if(createdUser) {
            response.status(200).json(createdUser)
        } else{
            if (error.errors[0].message === 'email must be unique'){
                response.status(400).send("El Email ya esta en uso.")
            }
            else if (error.errors[0].message === 'username must be unique'){
                response.status(400).send("El nombre de usuario ya esta en uso.")
            }
            else{
                response.status(400).send("Error al intentar de crear el usuario. Verifique los datos.")
            }
        }
    } else
        response.status(400).send('Faltan datos.')
    })

authenticationRouter.post('/login', async (request, response) => {
    const user = await checkCredentials(request.body)
    if(user) {
        const { id, username, email, roleName, address } = user
        const token = jwt.sign({ id, username, email, roleName, address }, jwtSecret)
        response.status(200).json({ token })
    } else
        response.status(401).send('Invalid credentials')
})

authenticationRouter.get('/userprofile', setUserInfo, async (request, response) => {
    if(request.userInfo) {
        response.status(200).json(request.userInfo)
    } else
        response.status(401).send('Invalid credentials')


})

module.exports = { authenticationRouter }