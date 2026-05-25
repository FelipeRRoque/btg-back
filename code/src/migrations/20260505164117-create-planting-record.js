'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('planting_records', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      planting_area_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'planting_areas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      crop_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'crops',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      plant_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      expected_harvest_date: {
        type: Sequelize.DATEONLY
      },
      actual_harvest_date: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('planting_records');
  }
};