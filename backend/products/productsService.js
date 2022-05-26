const { db } = require('../db/connect')

const getAllProducts = async () => {
    return await db.query(`
        SELECT prod.id, prod.name, prod.price, prod.stock, cat.name as categoryName
        FROM products prod
        JOIN categories cat ON prod.category = cat.id
    `, {
        type: db.QueryTypes.SELECT
    })
}

const getProduct = async id => {
    const [product] = await db.query(`
    SELECT prod.id, prod.name, prod.price, prod.stock, cat.name as categoryName
    FROM products prod
    JOIN categories cat ON prod.category = cat.id
    WHERE prod.id = :id
    `, {
        type: db.QueryTypes.SELECT,
        replacements: { id }
    })
    return product
}

const updateProduct = async product => {
    const [, modified] = await db.query(`
    UPDATE products SET
        name = :name,
        price = :price,
        stock = :stock,
        category = :category
    WHERE id = :id
    `, {
        type: db.QueryTypes.UPDATE,
        replacements: product
    })
    return modified > 0
}

const addProduct = async product => {
    const [id] = await db.query(`
    INSERT INTO products (name, price, stock, category) VALUES
        (:name, :price, :stock, :category)
    `, {
        replacements: product
    })
    return { ...product, id }
}

const deleteProduct = async id => {
    await db.query(`
        DELETE FROM products
        WHERE id = :id
    `, {
        replacements: { id }
    })
}

module.exports = {
    getAllProducts,
    getProduct,
    updateProduct,
    addProduct,
    deleteProduct
}