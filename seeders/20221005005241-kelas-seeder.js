'use strict';

const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Kelas",
    [
      {
        kelas: 10,
        JurusanId: 'TKJ',
        jurusan: 'TKJ',
        rombel: 1
      },
      {
        kelas: 10,
        JurusanId: 'TKJ',
        jurusan: 'TKJ',
        rombel: 2
      },
      {
        kelas: 10,
        JurusanId: 'RPL',
        jurusan: 'RPL',
        rombel: 1
      },
      {
        kelas: 10,
        JurusanId: 'RPL',
        jurusan: 'RPL',
        rombel: 2
      },
      {
        kelas: 11,
        JurusanId: 'MPLBMLOG',
        jurusan: 'MPLB',
        rombel: 1
      },      
      {
        kelas: 11,
        JurusanId: 'MPLBMLOG',
        jurusan: 'MPLB',
        rombel: 2
      },
    ]
    )
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
