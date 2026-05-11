'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ClimaticEvents', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      cultureId: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'Cultures',
          key: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      eventType: {
        type: Sequelize.STRING,
        allowNull: false
      },

      eventDate: {
        type: Sequelize.DATE,
        allowNull: false
      },

      intensity: {
        type: Sequelize.STRING
      },

      description: {
        type: Sequelize.TEXT
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

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('ClimaticEvents');
  }
};
