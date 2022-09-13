'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('siswa', {
      nis: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      nisn: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      nama: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      OrtuId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Ortu',
          key: 'id',
        },
      },
      KelasId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Kelas',
          key: 'id',
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nomor_ijazah_smk: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      nomor_ijazah_smp: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      tanggal_ijazah_smk: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      nomor_skhun: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      tahun_ijazah_smp: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.DATEONLY,
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
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      foto: {
        type: 'VARBINARY(100)',
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
      tgl_masuk: {
        type: Sequelize.DATEONLY,
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