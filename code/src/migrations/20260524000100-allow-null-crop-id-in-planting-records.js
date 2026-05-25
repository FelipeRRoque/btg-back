"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("planting_records", "crop_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "crops",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("planting_records", "crop_id", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "crops",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },
};
