'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Jurusan",
      [
        {
          nama: "RPL",
          desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
          konsentrasi: "",
        },
        {
          nama: "TKJ",
          desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
          konsentrasi: "",
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
