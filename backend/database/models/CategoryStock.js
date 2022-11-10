const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CategoryStock extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CategoryStock.belongsTo(models.Category, {
                foreignKey: 'item_cate_code',
                targetKey: 'item_cate_code',
                onDelete: 'CASCADE',
            })
        }
    }
    CategoryStock.init(
        {
            item_cate_code: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            cate_name: DataTypes.STRING,
            max_quantity: DataTypes.INTEGER,
            min_quantity: DataTypes.INTEGER,
            modify_by: DataTypes.STRING,
            modify_dt: DataTypes.DATE,
        }, {
        // options
        sequelize,
        modelName: 'CategoryStock',
        tableName: 'category_stock',
        createdAt: false,
        updatedAt: 'modify_dt',
        underscore: true,
    },
    );
    return CategoryStock;
}