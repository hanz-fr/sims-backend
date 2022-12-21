'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nilai_akhir', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RaportId: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Raport',
          key: 'id',
        }, 
      },
      nilai_us_teori: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nilai_us_praktek: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nilai_ukk: {
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
      nilai_akm: {
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nilai_akhir');
  }
};