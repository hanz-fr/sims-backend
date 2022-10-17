'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "mapel_jurusan",
      [
        {
          mapelJurusanId: 'RPL_PAI',
          MapelId: 'PAI',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_B.INGGRIS',
          MapelId: 'B.INGGRIS',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_B.INDONESIA',
          MapelId: 'B.INDONESIA',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_B.JEPANG',
          MapelId: 'B.JEPANG',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_B.SUNDA',
          MapelId: 'B.SUNDA',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_PJOK',
          MapelId: 'PJOK',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_SEJARAH',
          MapelId: 'SEJARAH',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_PPKN',
          MapelId: 'PPKN',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_MATEMATIKA',
          MapelId: 'MATEMATIKA',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_SENBUD',
          MapelId: 'SENBUD',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_SISKOMDIG',
          MapelId: 'SISKOMDIG',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_FISIKA',
          MapelId: 'FISIKA',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_KIMIA',
          MapelId: 'KIMIA',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_SISKOM',
          MapelId: 'SISKOM',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_KJD',
          MapelId: 'KJD',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_PROGDAS',
          MapelId: 'PROGDAS',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_PBO',
          MapelId: 'PBO',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_PWPB',
          MapelId: 'PWPB',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_DDG',
          MapelId: 'DDG',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_BD',
          MapelId: 'BD',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_PPL',
          MapelId: 'PPL',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'RPL_PKK',
          MapelId: 'PKK',
          JurusanId: 'RPL',
        },
        {
          mapelJurusanId: 'PPLG-RPL_PAI',
          MapelId: 'PAI',
          JurusanId: 'PPLG-RPL',
        },
        {
          mapelJurusanId: 'PPLG-RPL_PPKN',
          MapelId: 'PPKN',
          JurusanId: 'PPLG-RPL',
        },
        {
          mapelJurusanId: 'PPLG-RPL_B.INDONESIA',
          MapelId: 'B.INDONESIA',
          JurusanId: 'PPLG-RPL',
        },
        {
          mapelJurusanId: 'PPLG-RPL_PENJAS',
          MapelId: 'PENJAS',
          JurusanId: 'PPLG-RPL',
        },
        {
          mapelJurusanId: 'PPLG-RPL_SEJARAH',
          MapelId: 'SEJARAH',
          JurusanId: 'PPLG-RPL',
        },
        {
          mapelJurusanId: 'PPLG-RPL_SENIMUSIK',
          MapelId: 'SENIMUSIK',
          JurusanId: 'PPLG-RPL',
        },
        {
          mapelJurusanId: 'PPLG-RPL_MATEMATIKA',
          MapelId: 'MATEMATIKA',
          JurusanId: 'PPLG-RPL',
        },
        {
          mapelJurusanId: 'PPLG-RPL_B.INGGRIS',
          MapelId: 'B.INGGRIS',
          JurusanId: 'PPLG-RPL',
        },
        {
          mapelJurusanId: 'PPLG-RPL_INFORMATIKA',
          MapelId: 'INFORMATIKA',
          JurusanId: 'PPLG-RPL',
        },
        {
          mapelJurusanId: 'PPLG-RPL_IPAS',
          MapelId: 'IPAS',
          JurusanId: 'PPLG-RPL',
        },
        {
          mapelJurusanId: 'PPLG-RPL_KEJURUAN',
          MapelId: 'KEJURUAN',
          JurusanId: 'PPLG-RPL',
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
