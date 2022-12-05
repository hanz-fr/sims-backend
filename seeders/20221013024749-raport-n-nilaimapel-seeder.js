const { faker } = require("@faker-js/faker");

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
      "nilai_mapel",
      [
        {
          id: 'NMRPT1002360737-2-RPL.B.INDONESIA',
          idMapelJurusan: 'RPL_B.INDONESIA',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL.B.INGGRIS',
          idMapelJurusan: 'RPL_B.INGGRIS',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_FISIKA',
          idMapelJurusan: 'RPL_FISIKA',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_MATEMATIKA',
          idMapelJurusan: 'RPL_MATEMATIKA',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_SISKOM',
          idMapelJurusan: 'RPL_SISKOM',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_KJD',
          idMapelJurusan: 'RPL_KJD',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_PAI',
          idMapelJurusan: 'RPL_PAI',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_SISKOMDIG',
          idMapelJurusan: 'RPL_SISKOMDIG',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_SEJARAH',
          idMapelJurusan: 'RPL_SEJARAH',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_SENBUD',
          idMapelJurusan: 'RPL_SENBUD',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_KIMIA',
          idMapelJurusan: 'RPL_KIMIA',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_DDG',
          idMapelJurusan: 'RPL_DDG',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_BD',
          idMapelJurusan: 'RPL_BD',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_PPL',
          idMapelJurusan: 'RPL_PPL',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_PWPB',
          idMapelJurusan: 'RPL_PWPB',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_PBO',
          idMapelJurusan: 'RPL_PBO',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          id: 'NMRPT1002360737-2-RPL_PROGDAS',
          idMapelJurusan: 'RPL_PROGDAS',
          RaportId: "RPT1002360737-2",
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
      ]
    )


    // RPL Semester 5
    /* await queryInterface.bulkInsert(
      "nilai_mapel",
      [
        {
          idMapelJurusan: 'RPL_B.INDONESIA',
          RaportId: 7, // CHANGE RAPORT ID
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false })
        },
        {
          idMapelJurusan: 'RPL_B.INGGRIS',
          RaportId: 7, // CHANGE RAPORT ID
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false })
        },
        {
          idMapelJurusan: 'RPL_B.JEPANG',
          RaportId: 7, // CHANGE RAPORT ID
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false })
        },
        {
          idMapelJurusan: 'RPL_PKK',
          RaportId: 7, // CHANGE RAPORT ID
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false })
        },
        {
          idMapelJurusan: 'RPL_MATEMATIKA',
          RaportId: 7, // CHANGE RAPORT ID
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false })
        },
        {
          idMapelJurusan: 'RPL_PBO',
          RaportId: 7, // CHANGE RAPORT ID
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false })
        },
        {
          idMapelJurusan: 'RPL_PKK',
          RaportId: 7, // CHANGE RAPORT ID
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false })
        },
        {
          idMapelJurusan: 'RPL_PPKN',
          RaportId: 7, // CHANGE RAPORT ID
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false })
        },
        {
          idMapelJurusan: 'RPL_PPL',
          RaportId: 7, // CHANGE RAPORT ID
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false })
        },
        {
          idMapelJurusan: 'RPL_PWPB',
          RaportId: 7, // CHANGE RAPORT ID
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false })
        },
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
