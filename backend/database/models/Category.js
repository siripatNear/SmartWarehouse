const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Category.belongsTo(models.RawMaterials, {
                foreignKey: 'item_cate_code',
                as: 'category',
                targetKey: 'item_cate_code',
                onDelete: 'CASCADE',
            })
        }
    }
    Category.init(
        {
            item_cate_code: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            cate_name: DataTypes.STRING,
            create_by: DataTypes.STRING,
            create_by: DataTypes.STRING,
            create_dt: DataTypes.DATE,
            modify_by: DataTypes.STRING,
            modify_dt: DataTypes.DATE,
        },{
            // options
            sequelize,
            modelName: 'Category',
            tableName: 'category',
            createdAt: 'create_dt',
            updatedAt: 'modify_dt',
            underscore: true,
        },
    );
    return Category;
}