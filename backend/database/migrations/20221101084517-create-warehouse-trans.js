'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WarehouseTrans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      position_code: {
        type: Sequelize.STRING
      },
      floor_no: {
        type: Sequelize.INTEGER
      },
      col_no: {
        type: Sequelize.INTEGER
      },
      section: {
        type: Sequelize.INTEGER
      },
      zone: {
        type: Sequelize.INTEGER
      },
      warehouse_id: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WarehouseTrans');
  }
};