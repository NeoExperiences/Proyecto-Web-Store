const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const validateId = (request, response, next) => {
    const id = +request.params.id
    if(isNaN(id)) return response.status(400).send('invalid id')
    else next()
}

const verifyUserToken = (request, response, next) => {
    try {
        request.userToken = jwt.verify(request.headers.authorization.split(' ')[1], jwtSecret)
        if ((Date.now() - request.userToken.iat * 1000) < 2000000000)
            next()
        else(
            response.status(401).end()
        )
    } catch (error) {
        response.status(401).end()
    }
}

const checkRole = role => {
    return (request, response, next) => {
        try {
            const user = jwt.verify(request.headers.authorization.split(' ')[1], jwtSecret)
            if(user.roleName === role) {
                request.user = user
                next()
            } else throw 'bad role'
        } catch (error) {
            response.status(403).end()
        }
        
    }
}

module.exports = { validateId, verifyUserToken, checkRole }