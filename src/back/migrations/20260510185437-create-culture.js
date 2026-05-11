'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Cultures', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      cultureName: {
        type: Sequelize.STRING,
        allowNull: false
      },

      plantingLocation: {
        type: Sequelize.STRING,
        allowNull: false
      },

      plantingDate: {
        type: Sequelize.DATE,
        allowNull: false
      },

      plantedArea: {
        type: Sequelize.FLOAT,
        allowNull: false
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }

    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('Cultures');

  }
};