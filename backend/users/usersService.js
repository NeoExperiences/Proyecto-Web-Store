const bcrypt = require('bcrypt')
const { db } = require('../db/connect')

const getAllUsers = async () => {
    // return await db.models.User.findAll({ raw: true })
    return await db.query(`
        SELECT users.id, users.username, users.address, users.email, users.role, roles.name as roleName, users.picture
        FROM usuarios users
        JOIN roles ON users.role = roles.id
    `, {
        type: db.QueryTypes.SELECT
    })
}

const getUser = async id => {
    const [user] = await db.query(`
    SELECT users.id, users.username, users.address, users.email, roles.name as roleName, users.picture
    FROM usuarios users
    JOIN roles ON users.role = roles.id
    WHERE users.id = :id
    `, {
        type: db.QueryTypes.SELECT,
        replacements: { id }
    })
    return user
}

const updateUser = async user => {
    try {
    const [, modified] = await db.query(`
    UPDATE usuarios SET
        username = :username,
        address = :address,
        email = :email,
        role = :role,
        picture = :picture
    WHERE id = :id
    `, {
        type: db.QueryTypes.UPDATE,
        replacements: user
    })
    return modified > 0
    } catch(error) {
        console.log(error)
        return { error }
    }
}

const changeUser = async user => {
    const [, modified] = await db.query(`
    UPDATE usuarios SET
        username = :username,
        address = :address,
        email = :email,
        picture = :picture
    WHERE id = :id
    `, {
        type: db.QueryTypes.UPDATE,
        replacements: user
    })
    return modified > 0
}

const addUser = async ({ username, address, email, password }) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = {
        username,
        address,
        email,
        role:2,
        picture:"https://i.imgur.com/EvkyjiU.png",
        password: hash
    }
    try {
        const [id] = await db.query(`
        INSERT INTO usuarios (username, address, email, role, password, picture) VALUES
            (:username, :address, :email, :role, :password, :picture)
        `, {
            replacements: user
        })
        const createdUser = {...user, id}
        return { createdUser }
    } catch(error) {
        console.log(error)
        return { error }
    }
}

const deleteUser = async id => {
    await db.query(`
        DELETE FROM respuestas WHERE userID = :id;
    `, {
        replacements: { id }
    })
    await db.query(`
        DELETE respuestas FROM respuestas
        JOIN comentarios comments ON respuestas.commentID = comments.id
        WHERE comments.userID = :id;
    `, {
        replacements: { id }
    })
    await db.query(`
        DELETE FROM comentarios WHERE userID = :id;
    `, {
        replacements: { id }
    })
    await db.query(`
        DELETE comentarios FROM comentarios
        JOIN articulos artic ON comentarios.postID = artic.id
        WHERE comentarios.userID = :id;
    `, {
        replacements: { id }
    })
    await db.query(`
        DELETE FROM articulos WHERE userID = :id;
    `, {
        replacements: { id }
    })
    await db.query(`
        DELETE FROM usuarios
        WHERE id = :id
    `, {
        replacements: { id }
    })
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    changeUser,
    addUser,
    deleteUser
}