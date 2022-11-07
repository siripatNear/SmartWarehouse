const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Warehouse.hasMany(models.WarehouseTrans, {
        foreignKey: 'warehouse_id',
        // as: 'warehouseId',
        sourceKey: 'warehouse_id',
        onDelete: 'CASCADE',
    })
    }
  }
  Warehouse.init({
    warehouse_id: {
      type: DataTypes.STRING,
      primaryKey: true,
  },
    warehouse_desc: DataTypes.STRING,
    zones_per_wh: DataTypes.INTEGER,
    sections_per_zone: DataTypes.INTEGER,
    cols_per_sect: DataTypes.INTEGER,
    positions_per_col: DataTypes.INTEGER,
    create_by: DataTypes.STRING,
    create_dt: DataTypes.DATE,
    modify_by: DataTypes.STRING,
    modify_dt: DataTypes.DATE,
  }, {
    // options
    sequelize,
    modelName: 'Warehouse',
    tableName: 'warehouse',
    createdAt: 'create_dt',
    updatedAt: 'modify_dt',
    underscore: true,
  }
  );
  return Warehouse;
};