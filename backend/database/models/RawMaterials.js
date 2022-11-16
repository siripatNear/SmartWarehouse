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
            RawMaterials.hasOne(models.WarehouseTrans, {
                foreignKey: 'position_code',
                sourceKey: 'position_code',
                onDelete: 'CASCADE',
            }),
            RawMaterials.hasOne(models.Category, {
                foreignKey: 'item_cate_code',
                sourceKey: 'item_cate_code',
                as: 'category',
                onDelete: 'CASCADE',
            }),
            RawMaterials.belongsTo(models.OrderTrans, {
                foreignKey: 'item_code',
                targetKey: 'item_code',
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
            unit: {
                type: DataTypes.STRING,
                defaultValue: "meters",
            },
            item_status: {
                type: DataTypes.STRING,
                defaultValue: "new coming",
            },
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