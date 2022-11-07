const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderTrans extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            OrderTrans.belongsTo(models.Orders, {
                foreignKey: 'order_id',
                // as: 'orderId',
                targetKey: 'order_id',
                onDelete: 'CASCADE',
            }),
            OrderTrans.hasOne(models.RawMaterials, {
                foreignKey: 'item_code',
                sourceKey: 'item_code',
                onDelete: 'CASCADE',
            })
        }
    }
    OrderTrans.init(
        {
            order_id_trans: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            item_code: DataTypes.STRING,
            order_id: DataTypes.STRING,
        },{
            // options
            sequelize,
            modelName: 'OrderTrans',
            tableName: 'order_transaction',
            createdAt: false,
            updatedAt: false,
            underscore: true,
        },
    );
    return OrderTrans;
}