'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('warehouses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      warehouse_id: {
        type: Sequelize.STRING
      },
      warehouse_desc: {
        type: Sequelize.STRING
      },
      zones_per_wh: {
        type: Sequelize.INTEGER
      },
      sections_per_zone: {
        type: Sequelize.INTEGER
      },
      cols_per_sect: {
        type: Sequelize.INTEGER
      },
      positions_per_col: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('warehouses');
  }
};