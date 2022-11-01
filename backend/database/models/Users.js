const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Users.init(
        {
            user_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            password_hash: DataTypes.STRING,
            role: DataTypes.STRING,
            user_status: DataTypes.STRING,
            last_login: DataTypes.DATE,
            create_by: DataTypes.STRING,
            create_dt: DataTypes.DATE,
            modify_by: DataTypes.STRING,
            modify_dt: DataTypes.DATE,
        },{
            // options
            sequelize,
            modelName: 'Users',
            tableName: 'users',
            createdAt: 'create_dt',
            updatedAt: false,
            underscore: true,
        },
    );
    return Users;
}