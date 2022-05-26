
module.exports = (db, types) => {
    const User = db.define('User', {
        id: {
            type: types.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: types.STRING
        },
        address: {
            type: types.STRING
        },
        email: {
            type: types.STRING
        }
    }, { timestamps: false })
    
    const Order = db.define('Order', {
        id: {
            type: types.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: types.STRING
        }
    }, { timestamps: false })
    User.hasMany(Order)
    Order.belongsTo(User)
    
    const Product = db.define('Product', {
        id: {
            type: types.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        price: {
            type: types.FLOAT
        },
        stock: {
            type: types.INTEGER.UNSIGNED
        }
    }, { timestamps: false })
    
    const OrdersProducts = db.define('OrdersProducts', {
        // orderId: {
        //     type: types.INTEGER.UNSIGNED,
        //     references: {
        //         model: Order,
        //         key: 'id'
        //     }
        // },
        // productId: {
        //     type: types.INTEGER.UNSIGNED,
        //     references: {
        //         model: Product,
        //         key: 'id'
        //     }
        // },
        amount: {
            type: types.INTEGER.UNSIGNED
        }
    }, {
        tableName: 'orders_products',
        timestamps: false
    })
    
    Order.belongsToMany(Product, { through: OrdersProducts })
    Product.belongsToMany(Order, { through: OrdersProducts })
}
