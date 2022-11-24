'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('history', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      activityName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      activityAuthor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      activityDesc: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('history');
  }
};