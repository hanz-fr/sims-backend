'use strict';

const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    /* await queryInterface.bulkInsert(
      "Siswa",
      [
        {
          nis_siswa: 
        }
      ]
    ) */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
