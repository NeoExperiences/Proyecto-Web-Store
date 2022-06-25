const bcrypt = require('bcrypt')
const { db } = require('../db/connect')

const { addUser, getUser } = require('./usersService')

const checkCredentials = async ({ username, password }) => {
    const [user] = await db.query(`
    SELECT users.id, users.username, users.address, users.email, users.password, roles.name as roleName
    FROM usuarios users
    JOIN roles ON users.role = roles.id
    WHERE users.username = :username
    `, {
        type: db.QueryTypes.SELECT,
        replacements: { username }
    })

    return !!user && await bcrypt.compare(password, user.password) && user
}

module.exports = {
    registerUser: addUser,
    adquireUserData: getUser,
    checkCredentials
}
