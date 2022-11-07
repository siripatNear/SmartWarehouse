const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WarehouseTrans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WarehouseTrans.belongsTo(models.Warehouse, {
        foreignKey: 'warehouse_id',
        targetKey: 'warehouse_id',
        // as: 'warehouseId',
        onDelete: 'CASCADE',
      }),
      WarehouseTrans.belongsTo(models.RawMaterials, {
        foreignKey: 'position_code',
        targetKey: 'position_code',
        onDelete: 'CASCADE',
      })
    }
  }
  WarehouseTrans.init({
    position_code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    floor_no: DataTypes.INTEGER,
    col_no: DataTypes.INTEGER,
    section: DataTypes.INTEGER,
    zone: DataTypes.INTEGER,
    warehouse_id: DataTypes.STRING,
    create_by: DataTypes.STRING,
    create_dt: DataTypes.DATE,
    modify_by: DataTypes.STRING,
    modify_dt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'WarehouseTrans',
    tableName: 'warehouse_trans',
    createdAt: 'create_dt',
    updatedAt: 'modify_dt',
    underscore: true,
  });
  return WarehouseTrans;
};