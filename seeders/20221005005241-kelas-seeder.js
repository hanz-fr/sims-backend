'use strict';

const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Kelas",
    [
      {
        id: '10TKJ1',
        kelas: 10,
        JurusanId: 'TKJ',
        jurusan: 'TKJ',
        rombel: 1
      },
      {
        id: '10TKJ2',
        kelas: 10,
        JurusanId: 'TKJ',
        jurusan: 'TKJ',
        rombel: 2
      },
      {
        id: '10RPL1',
        kelas: 10,
        JurusanId: 'RPL',
        jurusan: 'RPL',
        rombel: 1
      },
      {
        id: '10RPL2',
        kelas: 10,
        JurusanId: 'RPL',
        jurusan: 'RPL',
        rombel: 2
      },
      {
        id: '10DKV1',
        kelas: 10,
        JurusanId: 'DKV',
        jurusan: 'DKV',
        rombel: 1
      },
      {
        id: '10DKV2',
        kelas: 10,
        JurusanId: 'DKV',
        jurusan: 'DKV',
        rombel: 2
      },
      {
        id: '10MLOG1',
        kelas: 10,
        JurusanId: 'MLOG',
        jurusan: 'MLOG',
        rombel: 1
      },
      {
        id: '10MLOG2',
        kelas: 10,
        JurusanId: 'MLOG',
        jurusan: 'MLOG',
        rombel: 2
      },
      {
        id: '10BDP1',
        kelas: 10,
        JurusanId: 'BDP-BD',
        jurusan: 'BDP',
        rombel: 1
      },
      {
        id: '10BDP2',
        kelas: 10,
        JurusanId: 'BDP-BD',
        jurusan: 'BDP',
        rombel: 2
      },
      {
        id: '10MM1',
        kelas: 10,
        JurusanId: 'MM-DKV',
        jurusan: 'MM',
        rombel: 1
      },
      {
        id: '10MM2',
        kelas: 10,
        JurusanId: 'MM-DKV',
        jurusan: 'MM',
        rombel: 2
      },
      {
        id: '10OTKP1',
        kelas: 10,
        JurusanId: 'OTKP-MP',
        jurusan: 'OTKP',
        rombel: 1
      },
      {
        id: '10OTKP2',
        kelas: 10,
        JurusanId: 'OTKP-MP',
        jurusan: 'OTKP',
        rombel: 2
      },
      {
        id: '10AKL1',
        kelas: 10,
        JurusanId: 'AKL-A',
        jurusan: 'AKL',
        rombel: 1
      },
      {
        id: '10AKL2',
        kelas: 10,
        JurusanId: 'AKL-A',
        jurusan: 'AKL',
        rombel: 2
      },
      {
        id: '10MPLB1',
        kelas: 10,
        JurusanId: 'MPLB-MLOG',
        jurusan: 'MPLB',
        rombel: 1
      },
      {
        id: '10MPLB2',
        kelas: 10,
        JurusanId: 'MPLB-MLOG',
        jurusan: 'MPLB',
        rombel: 2
      },
      {
        id: '10PPLG1',
        kelas: 10,
        JurusanId: 'PPLG-RPL',
        jurusan: 'PPLG',
        rombel: 1
      },
      {
        id: '10PPLG2',
        kelas: 10,
        JurusanId: 'PPLG-RPL',
        jurusan: 'PPLG',
        rombel: 2
      },
      {
        id: '10TJKT1',
        kelas: 10,
        JurusanId: 'TJKT-TKJ',
        jurusan: 'TJKT',
        rombel: 1
      },
      {
        id: '10TJKT2',
        kelas: 10,
        JurusanId: 'TJKT-TKJ',
        jurusan: 'TJKT',
        rombel: 2
      },
      {
        id: '10PM1',
        kelas: 10,
        JurusanId: 'PM-BD',
        jurusan: 'PM',
        rombel: 1
      },
      {
        id: '10PM2',
        kelas: 10,
        JurusanId: 'PM-BD',
        jurusan: 'PM',
        rombel: 2
      },
      {
        id: '11TKJ1',
        kelas: 11,
        JurusanId: 'TKJ',
        jurusan: 'TKJ',
        rombel: 1
      },
      {
        id: '11TKJ2',
        kelas: 11,
        JurusanId: 'TKJ',
        jurusan: 'TKJ',
        rombel: 2
      },
      {
        id: '11RPL1',
        kelas: 11,
        JurusanId: 'RPL',
        jurusan: 'RPL',
        rombel: 1
      },
      {
        id: '11RPL2',
        kelas: 11,
        JurusanId: 'RPL',
        jurusan: 'RPL',
        rombel: 2
      },
      {
        id: '11DKV1',
        kelas: 11,
        JurusanId: 'DKV',
        jurusan: 'DKV',
        rombel: 1
      },
      {
        id: '11DKV2',
        kelas: 11,
        JurusanId: 'DKV',
        jurusan: 'DKV',
        rombel: 2
      },
      {
        id: '11MLOG1',
        kelas: 11,
        JurusanId: 'MLOG',
        jurusan: 'MLOG',
        rombel: 1
      },
      {
        id: '11MLOG2',
        kelas: 11,
        JurusanId: 'MLOG',
        jurusan: 'MLOG',
        rombel: 2
      },
      {
        id: '11BDP1',
        kelas: 11,
        JurusanId: 'BDP-BD',
        jurusan: 'BDP',
        rombel: 1
      },
      {
        id: '11BDP2',
        kelas: 11,
        JurusanId: 'BDP-BD',
        jurusan: 'BDP',
        rombel: 2
      },
      {
        id: '11MM1',
        kelas: 11,
        JurusanId: 'MM-DKV',
        jurusan: 'MM',
        rombel: 1
      },
      {
        id: '11MM2',
        kelas: 11,
        JurusanId: 'MM-DKV',
        jurusan: 'MM',
        rombel: 2
      },
      {
        id: '11OTKP1',
        kelas: 11,
        JurusanId: 'OTKP-MP',
        jurusan: 'OTKP',
        rombel: 1
      },
      {
        id: '11OTKP2',
        kelas: 11,
        JurusanId: 'OTKP-MP',
        jurusan: 'OTKP',
        rombel: 2
      },
      {
        id: '11AKL1',
        kelas: 11,
        JurusanId: 'AKL-A',
        jurusan: 'AKL',
        rombel: 1
      },
      {
        id: '11AKL2',
        kelas: 11,
        JurusanId: 'AKL-A',
        jurusan: 'AKL',
        rombel: 2
      },
      {
        id: '11MPLB1',
        kelas: 11,
        JurusanId: 'MPLB-MLOG',
        jurusan: 'MPLB',
        rombel: 1
      },
      {
        id: '11MPLB2',
        kelas: 11,
        JurusanId: 'MPLB-MLOG',
        jurusan: 'MPLB',
        rombel: 2
      },
      {
        id: '11PPLG1',
        kelas: 11,
        JurusanId: 'PPLG-RPL',
        jurusan: 'PPLG',
        rombel: 1
      },
      {
        id: '11PPLG2',
        kelas: 11,
        JurusanId: 'PPLG-RPL',
        jurusan: 'PPLG',
        rombel: 2
      },
      {
        id: '11TJKT1',
        kelas: 11,
        JurusanId: 'TJKT-TKJ',
        jurusan: 'TJKT',
        rombel: 1
      },
      {
        id: '11TJKT2',
        kelas: 11,
        JurusanId: 'TJKT-TKJ',
        jurusan: 'TJKT',
        rombel: 2
      },
      {
        id: '11PM1',
        kelas: 11,
        JurusanId: 'PM-BD',
        jurusan: 'PM',
        rombel: 1
      },
      {
        id: '11PM2',
        kelas: 11,
        JurusanId: 'PM-BD',
        jurusan: 'PM',
        rombel: 2
      },
      {
        id: '12TKJ1',
        kelas: 12,
        JurusanId: 'TKJ',
        jurusan: 'TKJ',
        rombel: 1
      },
      {
        id: '12TKJ2',
        kelas: 12,
        JurusanId: 'TKJ',
        jurusan: 'TKJ',
        rombel: 2
      },
      {
        id: '12RPL1',
        kelas: 12,
        JurusanId: 'RPL',
        jurusan: 'RPL',
        rombel: 1
      },
      {
        id: '12RPL2',
        kelas: 12,
        JurusanId: 'RPL',
        jurusan: 'RPL',
        rombel: 2
      },
      {
        id: '12DKV1',
        kelas: 12,
        JurusanId: 'DKV',
        jurusan: 'DKV',
        rombel: 1
      },
      {
        id: '12DKV2',
        kelas: 12,
        JurusanId: 'DKV',
        jurusan: 'DKV',
        rombel: 2
      },
      {
        id: '12MLOG1',
        kelas: 12,
        JurusanId: 'MLOG',
        jurusan: 'MLOG',
        rombel: 1
      },
      {
        id: '12MLOG2',
        kelas: 12,
        JurusanId: 'MLOG',
        jurusan: 'MLOG',
        rombel: 2
      },
      {
        id: '12BDP1',
        kelas: 12,
        JurusanId: 'BDP-BD',
        jurusan: 'BDP',
        rombel: 1
      },
      {
        id: '12BDP2',
        kelas: 12,
        JurusanId: 'BDP-BD',
        jurusan: 'BDP',
        rombel: 2
      },
      {
        id: '12MM1',
        kelas: 12,
        JurusanId: 'MM-DKV',
        jurusan: 'MM',
        rombel: 1
      },
      {
        id: '12MM2',
        kelas: 12,
        JurusanId: 'MM-DKV',
        jurusan: 'MM',
        rombel: 2
      },
      {
        id: '12OTKP1',
        kelas: 12,
        JurusanId: 'OTKP-MP',
        jurusan: 'OTKP',
        rombel: 1
      },
      {
        id: '12OTKP2',
        kelas: 12,
        JurusanId: 'OTKP-MP',
        jurusan: 'OTKP',
        rombel: 2
      },
      {
        id: '12AKL1',
        kelas: 12,
        JurusanId: 'AKL-A',
        jurusan: 'AKL',
        rombel: 1
      },
      {
        id: '12AKL2',
        kelas: 12,
        JurusanId: 'AKL-A',
        jurusan: 'AKL',
        rombel: 2
      },
      {
        id: '12MPLB1',
        kelas: 12,
        JurusanId: 'MPLB-MLOG',
        jurusan: 'MPLB',
        rombel: 1
      },
      {
        id: '12MPLB2',
        kelas: 12,
        JurusanId: 'MPLB-MLOG',
        jurusan: 'MPLB',
        rombel: 2
      },
      {
        id: '12PPLG1',
        kelas: 12,
        JurusanId: 'PPLG-RPL',
        jurusan: 'PPLG',
        rombel: 1
      },
      {
        id: '12PPLG2',
        kelas: 12,
        JurusanId: 'PPLG-RPL',
        jurusan: 'PPLG',
        rombel: 2
      },
      {
        id: '12TJKT1',
        kelas: 12,
        JurusanId: 'TJKT-TKJ',
        jurusan: 'TJKT',
        rombel: 1
      },
      {
        id: '12TJKT2',
        kelas: 12,
        JurusanId: 'TJKT-TKJ',
        jurusan: 'TJKT',
        rombel: 2
      },
      {
        id: '12PM1',
        kelas: 12,
        JurusanId: 'PM-BD',
        jurusan: 'PM',
        rombel: 1
      },
      {
        id: '12PM2',
        kelas: 12,
        JurusanId: 'PM-BD',
        jurusan: 'PM',
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
