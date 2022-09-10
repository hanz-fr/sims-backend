'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Siswa.init({
    nis: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      nisn: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nomor_ijazah_smk: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      tanggal_ijazah_smk: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      nomor_ijazah_smp: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      nomor_skhun: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      tahun_ijazah_smp: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      alamat_siswa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama_sekolah_asal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tmp_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tgl_lahir: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.ENUM('L', 'P'),
        allowNull: false,
      },
      anak_ke: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('AA','AK','AT'),
        allowNull: true,
      },
      agama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keterangan_lain: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      no_telp: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      foto: {
        type: 'VARBINARY(100)',
        allowNull: false,
      },
      berat_badan: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tinggi_badan: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lingkar_kepala: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tgl_masuk: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isAlumni: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'Siswa',
  });
  return Siswa;
};