const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RawMaterials extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            RawMaterials.belongsTo(models.WarehouseTrans, {
                foreignKey: 'position_code',
                as: 'item',
                onDelete: 'CASCADE',
            }),
            RawMaterials.belongsTo(models.Category, {
                foreignKey: 'item_cate_code',
                as: 'category',
                onDelete: 'CASCADE',
            }),
            RawMaterials.hasOne(models.OrderTrans, {
                foreignKey: 'item_code',
                as: 'orders',
                onDelete: 'CASCADE',
            })
        }
    }
    RawMaterials.init(
        {
            item_code: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            item_cate_code: DataTypes.STRING,
            sub_cate_code: DataTypes.STRING,
            internal_id: DataTypes.STRING,
            length: DataTypes.INTEGER,
            unit: DataTypes.STRING,
            item_status: DataTypes.STRING,
            position_code: DataTypes.STRING,
            qc_by: DataTypes.STRING,
            qc_dt: DataTypes.DATE,
            device_code: DataTypes.STRING,
            create_by: DataTypes.STRING,
            create_dt: DataTypes.DATE,
            modify_by: DataTypes.STRING,
            modify_dt: DataTypes.DATE,
        },{
            // options
            sequelize,
            modelName: 'RawMaterials',
            tableName: 'raw_materials',
            createdAt: 'create_dt',
            updatedAt: 'modify_dt',
            underscore: true,
        },
    );
    return RawMaterials;
}