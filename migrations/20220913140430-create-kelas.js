'use strict';

const { STRING } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kelas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(50)
      },
      kelas: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      rombel: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      jurusan: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      JurusanId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Jurusan',
          key: 'id',
        },
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
    await queryInterface.dropTable('kelas');
  }
};