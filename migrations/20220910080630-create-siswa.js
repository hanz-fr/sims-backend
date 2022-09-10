'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Siswa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nis: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      nisn: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nomor_ijazah_smk: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      tanggal_ijazah_smk: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      nomor_ijazah_smp: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      nomor_skhun: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      tahun_ijazah_smp: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      alamat_siswa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_sekolah_asal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tmp_lahir: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tgl_lahir: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('L', 'P'),
        allowNull: false,
      },
      anak_ke: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('AA','AK','AT'),
        allowNull: true,
      },
      agama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      keterangan_lain: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_telp: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      foto: {
        type: 'VARBINARY(100)',
        allowNull: false,
      },
      berat_badan: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tinggi_badan: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lingkar_kepala: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tgl_masuk: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      isAlumni: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Siswa');
  }
};