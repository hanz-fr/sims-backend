'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mutasi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nis_siswa: {
        type: Sequelize.STRING(10),
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Siswa',
          key: 'nis'
        }
      },
      alasan_mutasi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pindah_dari: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pindah_ke: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tgl_mutasi: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      sk_mutasi: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('mutasi');
  }
};