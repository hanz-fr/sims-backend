'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ortu', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      nis_siswa: {
        type: Sequelize.STRING(10),
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Siswa',
          key: 'nis_siswa'
        }
      },
      nama_ayah: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama_ibu: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      alamat_ortu: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_telp_ortu: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      email_ortu: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama_wali: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      alamat_wali: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_telp_wali: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      pekerjaan_wali: {
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
    await queryInterface.dropTable('ortu');
  }
};