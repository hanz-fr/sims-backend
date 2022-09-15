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
      Siswa.belongsTo(models.Ortu);
      Siswa.belongsTo(models.Kelas, {
        foreignKey: "KelasId",
        targetKey: "id",
      });
      Siswa.hasMany(models.Raport, {
        foreignKey: 'nis_siswa',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Siswa.init({
    nis: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING(10),
    },
    OrtuId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Ortu',
        key: 'id',
      },
    },
    KelasId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Kelas',
        key: 'id',
      },
    },
    nisn: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nomor_ijazah_smk: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    nomor_ijazah_smp: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    tanggal_ijazah_smk: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    nomor_skhun: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    tahun_ijazah_smp: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.DATEONLY,
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
      type: DataTypes.ENUM('AA', 'AK', 'AT'),
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
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    foto: {
      type: 'VARBINARY(100)',
      allowNull: true,
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
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    isAlumni: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Siswa',
    tableName: 'siswa',
  });
  return Siswa;
};