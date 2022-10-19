const { faker } = require("@faker-js/faker");

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
      "raport",
      [
        {
          nis_siswa: "1167787145", // Change NIS Siswa
          semester: 6,
          thn_ajaran: 2022,
          sakit: 2,
          ijin: 1,
          alpa: 0,
          isNaik: true,
          naikKelas: "Lulus",
          tgl_kenaikan: "2022-07-06"
        }
      ]
    )

    await queryInterface.bulkInsert(
      "nilai_mapel",
      [
        {
          idMapelJurusan: 'RPL_B.INDONESIA',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_B.INGGRIS',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_FISIKA',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_MATEMATIKA',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_SISKOM',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_KJD',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_PAI',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_SISKOMDIG',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_SEJARAH',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_SENBUD',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_KIMIA',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_DDG',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_BD',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_PPL',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_PWPB',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_PBO',
          RaportId: 3,
          nilai_pengetahuan: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_keterampilan: faker.random.numeric(2, { allowLeadingZero: false }),
          kkm: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_us_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_teori: faker.random.numeric(2, { allowLeadingZero: false }),
          nilai_ukk_praktek: faker.random.numeric(2, { allowLeadingZero: false }),
        },
        {
          idMapelJurusan: 'RPL_PROGDAS',
          RaportId: 3,
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