'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Mapel",
      [
        {
          id: "PAI",
          nama: "Pendidikan Agama Islam"
        },
        {
          id: "B.INGGRIS",
          nama: "Bahasa Inggris"
        },
        {
          id: "B.INDONESIA",
          nama: "Bahasa Indonesia"
        },
        {
          id: "B.JEPANG",
          nama: "Bahasa Jepang"
        },
        {
          id: "B.MANDARIN",
          nama: "Bahasa Mandarin"
        },
        {
          id: "B.SUNDA",
          nama: "Bahasa Mandarin"
        },
        {
          id: "PENJAS",
          nama: "Pendidikan Jasmani"
        },
        {
          id: "SEJARAH",
          nama: "Sejarah"
        },
        {
          id: "SENIMUSIK",
          nama: "Seni Musik"
        },
        {
          id: "PPKN",
          nama: "Pendidikan Pancasila dan Kewarganegaraan"
        },
        {
          id: "MATEMATIKA",
          nama: "Matematika"
        },
        {
          id: "INFORMATIKA",
          nama: "Informatika"
        },
        {
          id: "IPAS",
          nama: "Project Ilmu Pengetahuan Alam dan Sosial"
        },
        {
          id: "SENBUD",
          nama: "Seni Budaya"
        },
        {
          id: "PJOK",
          nama: "Pendidikan Jasmani dan Rohani Kesehatan"
        },
        {
          id: "SISKOMDIG",
          nama: "Simulasi dan Komunikasi Digital"
        },
        {
          id: "FISIKA",
          nama: "Fisika"
        },
        {
          id: "KIMIA",
          nama: "Kimia"
        },
        {
          id: "SISKOM",
          nama: "Sistem Komputer"
        },
        {
          id: "KJD",
          nama: "Komputer dan Jaringan Dasar"
        },
        {
          id: "PROGDAS",
          nama: "Pemrograman Dasar"
        },
        {
          id: "DDG",
          nama: "Dasar Desain Grafis"
        },
        {
          id: "PPL",
          nama: "Pemodelan Perangkat Lunak"
        },
        {
          id: "BD",
          nama: "Basis Data"
        },
        {
          id: "PBO",
          nama: "Pemrograman Berorientasi Objek"
        },
        {
          id: "PWPB",
          nama: "Pemrograman Web dan Perangkat Bergerak"
        },
        {
          id: "PKK",
          nama: "Produk Kreatif dan Kewirausahaan"
        },
        {
          id: "KEJURUAN",
          nama: "?"
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
