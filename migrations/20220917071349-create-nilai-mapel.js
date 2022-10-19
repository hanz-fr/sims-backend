'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nilai_mapel', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idMapelJurusan: {
        type: Sequelize.STRING(50),
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'mapel_jurusan',
          key: 'mapelJurusanId',
        },
      },
      RaportId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Raport',
          key: 'id',
        }
      },
      nilai_keterampilan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nilai_pengetahuan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kkm: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      nilai_us_teori: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nilai_us_praktek: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nilai_ukk_teori: {
        type: Sequelize.INTEGER,
        allowNull: true, 
      },
      nilai_ukk_praktek: {
        type: Sequelize.INTEGER,
        allowNull: true, 
      },
      nilai_akm: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nilai_mapel');
  }
};