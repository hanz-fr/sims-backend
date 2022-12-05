/* 'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ortu', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nik_ortu: {
        type: Sequelize.STRING(16),
        allowNull: true,
      },
      nama: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      hubungan: {
        type: Sequelize.ENUM('Ibu', 'Ayah', 'Wali'),
        allowNull: false,
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      no_telp: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      pekerjaan: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
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
    await queryInterface.dropTable('ortu');
  }
}; */