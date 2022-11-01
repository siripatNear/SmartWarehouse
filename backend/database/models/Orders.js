const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Orders.hasMany(models.OrderTrans, {
                foreignKey: 'order_id_trans',
                as: 'order_id_trans',
                onDelete: 'CASCADE',
            });
        }
    }
    Orders.init(
        {
            order_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            order_status: DataTypes.STRING,
            order_remark: DataTypes.STRING,
            quantity: DataTypes.INTEGER,
            progress_by: DataTypes.STRING,
            create_by: DataTypes.STRING,
            create_dt: DataTypes.DATE,
            modify_by: DataTypes.STRING,
            modify_dt: DataTypes.DATE,
        }, {
        // options
        sequelize,
        modelName: 'Orders',
        tableName: 'orders',
        createdAt: 'create_dt',
        updatedAt: 'modify_by',
        underscore: true,
    },
    );
    return Orders;
}