const { db } = require('../db/connect')


const getAllOrders = async () => {
    return await db.query(`
    SELECT orders.id, orders.userId, orders.status
    FROM orders
    `, {
        type: db.QueryTypes.SELECT
    })
}

const getOrder = async id => {
    const order = await db.models.Order.findOne({
        where: { id },
        nested: true,
        include: [{
            model: db.models.User
        }, {
            model: db.models.Product,
            attributes: ['price', 'name']
        }]
    })
    // console.log(await order.getProducts({raw:true}))
    // const order = await db.query(`
    // SELECT orders.id, orders.userId, products.name, op.amount, orders.status
    // FROM orders
    // JOIN orders_products op ON orders.id = op.orderId
    // JOIN products ON op.productId = products.id
    // WHERE orders.id = :id
    // `, {
    //     type: db.QueryTypes.SELECT,
    //     replacements: { id }
    // })
    // console.log(order)
    return order
    // return order? order.reduce(
    //         (order, product) =>
    //         ({ ...order, products: order.products.concat({ name: product.name, amount: product.amount }) })
    //     , { id: order[0].id, userId: order[0].userId, status: order[0].status, products: [] }) : null
}

const updateOrder = async order => {
    return order
}

const addOrder = async ({ user, products }) => {
    console.log(user)
    const [orderId] = await db.query(`
    INSERT INTO orders (userId, status) VALUES
        (:userId, 1)
    `, {
        replacements: { userId: user.id }
    })

    // await Promise.all(products.map(product => db.query(`
    //     INSERT INTO orders_products (orderId, productId, amount) VALUES
    //         (:orderId, :productId, :amount)
    //     `, {
    //         replacements: {
    //             productId: product.id,
    //             amount: product.amount,
    //             orderId
    //         }
    //     })
    // ))

    const productsReplacements = products.map(product => [orderId, product.id, product.amount,]).flat()
    const productsPlaceholders = products.map(() => "(?,?,?)").join(',')
    db.query(`
        INSERT INTO orders_products (orderId, productId, amount) VALUES ${productsPlaceholders}
    `, {
        replacements: productsReplacements
    })

    return await getOrder(orderId)
}

const deleteOrder = async id => { }


module.exports = {
    getAllOrders,
    getOrder,
    updateOrder,
    addOrder,
    deleteOrder
}