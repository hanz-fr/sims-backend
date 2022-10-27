'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nilai_mapel', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
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
        type: Sequelize.STRING,
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
        allowNull: true,
      },
      nilai_pengetahuan: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      kkm: {
        type: Sequelize.INTEGER,
        allowNull: true,
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