const { db } = require('../db/connect')

const getAllCategories = async () => {
    return await db.query(`
        SELECT cat.id, cat.name
        FROM categorias cat ORDER BY id ASC
    `, {
        type: db.QueryTypes.SELECT
    })
}

module.exports = {
    getAllCategories
}