'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Jurusan",
      [
        {
          id: "RPL",
          nama: "RPL",
          desc: "Program keahlian Rekayasa Perangkat Lunak dengan konsentrasi Rekayasa Perangkat Lunak",
          konsentrasi: "",
        },
        {
          id: "DKV",
          nama: "DKV",
          desc: "Program keahlian Desain Komunikasi Visual dengan konsentrasi Desain Komunikasi Visual",
          konsentrasi: "",
        },
        {
          id: "TKJ",
          nama: "TKJ",
          desc: "Program keahlian Teknik Komputer dan Jaringan dengan konsentrasi Teknik Komputer dan Jaringan",
          konsentrasi: "",
        },
        {
          id: "MLOG",
          nama: "MLOG",
          desc: "Program keahlian Manajemen Logistik dengan konsentrasi Manajemen Logistik",
          konsentrasi: "",
        },
        {
          id: "BDP-BD",
          nama: "BDP",
          desc: "Program keahlian Bisnis Daring Pemasaran dengan konsentrasi Bisnis Digital",
          konsentrasi: "BD",
        },
        {
          id: "MM-DKV",
          nama: "MM",
          desc: "Program keahlian Multimedia dengan konsentrasi Desain Komunikasi Visual",
          konsentrasi: "DKV",
        },
        {
          id: "OTKP-MP",
          nama: "OTKP",
          desc: "Program keahlian Otomatisasi dan Tata Kelola Perkantoran dengan konsentrasi Manajemen Perkantoran",
          konsentrasi: "MP",
        },
        {
          id: "AKL-LP",
          nama: "AKL",
          desc: "Program keahlian Akuntansi dan Keuangan Lembaga dengan konsentrasi Layanan Perbankan",
          konsentrasi: "LP",
        },
        {
          id: "AKL-LPS",
          nama: "AKL",
          desc: "Program keahlian Akuntansi dan Keuangan Lembaga dengan konsentrasi Layanan Perbankan Syariah",
          konsentrasi: "LPS",
        },
        {
          id: "AKL-A",
          nama: "AKL",
          desc: "Program keahlian Akuntansi dan Keuangan Lembaga dengan konsentrasi Akuntansi",
          konsentrasi: "A",
        },
        {
          id: "MPLB-MLOG",
          nama: "MPLB",
          desc: "Program keahlian Manajemen Perkantoran dan Layanan Bisnis dengan konsentrasi Manajemen Logistik",
          konsentrasi: "MLOG",
        },
        {
          id: "MPLB-MP",
          nama: "MPLB",
          desc: "Program keahlian Manajemen Perkantoran dan Layanan Bisnis dengan konsentrasi Manajemen Perkantoran",
          konsentrasi: "MP",
        },
        {
          id: "PPLG-RPL",
          nama: "PPLG",
          desc: "Program keahlian Pengembangan Perangkat Lunak dan Gim dengan konsentrasi Rekayasa Perangkat Lunak",
          konsentrasi: "RPL",
        },
        {
          id: "PPLG-PG",
          nama: "PPLG",
          desc: "Program keahlian Pengembangan Perangkat Lunak dan Gim dengan konsentrasi Pengembangan Gim",
          konsentrasi: "PG",
        },
        {
          id: "PPLG-SIJA",
          nama: "PPLG",
          desc: "Program keahlian Pengembangan Perangkat Lunak dan Gim dengan konsentrasi Sistem Informasi, Jaringan dan Aplikasi",
          konsentrasi: "SIJA",
        },
        {
          id: "TJKT-TKJ",
          nama: "TJKT",
          desc: "Program keahlian Teknik Jaringan Komputer dan Telekomunikasi dengan konsentrasi Teknik Komputer dan Jaringan",
          konsentrasi: "TKJ",
        },
        {
          id: "TJKT-TJAT",
          nama: "TJKT",
          desc: "Program keahlian Teknik Jaringan Komputer dan Telekomunikasi dengan konsentrasi Teknik Jaringan Akses Telekomunikasi",
          konsentrasi: "TJAT",
        },
        {
          id: "TJKT-TTT",
          nama: "TJKT",
          desc: "Program keahlian Teknik Jaringan Komputer dan Telekomunikasi dengan konsentrasi Teknik Transmisi dan Telekomunikasi",
          konsentrasi: "TTT",
        },
        {
          id: "PM-BD",
          nama: "PM",
          desc: "Program keahlian Pemasaran dengan konsentrasi Bisnis Digital",
          konsentrasi: "BD",
        },
        {
          id: "PM-BR",
          nama: "PM",
          desc: "Program keahlian Pemasaran dengan konsentrasi Bisnis Retail",
          konsentrasi: "BR",
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
