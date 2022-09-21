'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mapel_jurusan', {
      mapelJurusanId: {
        type: Sequelize.STRING(50),
        primaryKey: true,
        allowNull: false,
      },
      MapelId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Mapel',
          key: 'id',
        },
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
    await queryInterface.dropTable('mapel_jurusan');
  }
};