('use strict');

const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Siswa",
      [
        {
          nis_siswa: faker.random.numeric(10),
          KelasId: "11PM1",
          nisn_siswa: faker.random.numeric(10),
          nama_siswa: faker.name.fullName(),
          tmp_lahir: faker.address.city(),
          tgl_lahir: "2000-01-01",
          jenis_kelamin: faker.helpers.arrayElement(["L", "P"]),
          agama: faker.helpers.arrayElement([
            "Islam",
            "Katolik",
            "Kristen Protestan",
            "Buddha",
          ]),
          anak_ke: faker.random.numeric(1),
          status: faker.helpers.arrayElement(["AK", "AA", "AT"]),
          alamat_siswa: faker.address.streetAddress(),
          email_siswa: faker.internet.email(),
          no_telp_siswa: faker.random.numeric(12),
          tgl_diterima: "2021-06-01",
          diterima_di_kelas: "11PM1",
          semester_diterima: faker.helpers.arrayElement(['1']),
          thn_ajaran: "2021-2024",
          angkatan: "2024",
          status_siswa: "aktif",
          sekolah_asal: "SMPN " + faker.random.numeric(1) + " " + faker.address.cityName(),
          alamat_sekolah_asal: faker.address.streetAddress(),
          thn_ijazah_smp: "2021",
          no_ijazah_smp: faker.random.numeric(18),
          thn_skhun_smp: "2021",
          no_skhun_smp: faker.random.numeric(10),
          nama_ayah: faker.name.fullName(),
          nama_ibu: faker.name.fullName(),
          alamat_ortu: faker.address.streetAddress(),
          no_telp_ortu: faker.random.numeric(12),
          email_ortu: faker.internet.email(),
          nama_wali: null,
          alamat_wali: null,
          no_telp_wali: null,
          pekerjaan_wali: null,
          tgl_meninggalkan_sekolah: null,
          alasan_meninggalkan_sekolah: null,
          no_ijazah_smk: null,
          tgl_ijazah_smk: null,
          foto: null,
          keterangan_lain: null,
          berat_badan: faker.random.numeric(2),
          tinggi_badan: faker.random.numeric(3),
          lingkar_kepala: faker.random.numeric(2),
          isAlumni: false,
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
