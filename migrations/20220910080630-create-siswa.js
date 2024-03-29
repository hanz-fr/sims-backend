'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('siswa', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      nis_siswa: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      KelasId: {
        type: Sequelize.STRING(50),
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Kelas',
          key: 'id',
        },
      },
      nisn_siswa: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      nama_siswa: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tmp_lahir: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tgl_lahir: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('L', 'P'),
        allowNull: false,
      },
      agama: {
        type: Sequelize.STRING,
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
      alamat_siswa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email_siswa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_telp_siswa: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      tgl_diterima: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      semester_diterima: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      diterima_di_kelas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thn_ajaran: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      angkatan: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_siswa: {
        type: Sequelize.ENUM('aktif', 'non-aktif'),
        allowNull: false,
      },
      sekolah_asal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alamat_sekolah_asal: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      thn_ijazah_smp: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      no_ijazah_smp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      thn_skhun_smp: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      no_skhun_smp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tgl_meninggalkan_sekolah: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      alasan_meninggalkan_sekolah: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_ijazah_smk: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tgl_ijazah_smk: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      keterangan_lain: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: true,
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
      golongan_darah: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('siswa');
  }
};