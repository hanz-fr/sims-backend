'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('siswa', {
      nis_siswa: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      /* OrtuId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Ortu',
          key: 'id',
        },
      }, */
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
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      thn_skhun_smp: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      no_skhun_smp: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      nama_ayah: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama_ibu: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      alamat_ortu: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_telp_ortu: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      email_ortu: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama_wali: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      alamat_wali: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_telp_wali: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      pekerjaan_wali: {
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
        type: Sequelize.STRING(20),
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