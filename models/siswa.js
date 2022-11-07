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
      // Siswa.belongsTo(models.Ortu);
      Siswa.belongsTo(models.Kelas, {
        as: "kelas",
        foreignKey: "KelasId",
        targetKey: "id",
      });
      Siswa.hasMany(models.Raport, {
        as: "raport",
        foreignKey: 'nis_siswa',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Siswa.hasOne(models.Mutasi, {
        as: "mutasi",
        foreignKey: 'nis_siswa',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }); 
    }
  }
  Siswa.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    nis_siswa: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING(10),
    },
    /* OrtuId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Ortu',
        key: 'id',
      },
    }, */
    KelasId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Kelas',
        key: 'id',
      },
    },
    nisn_siswa: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nama_siswa: {
      type: DataTypes.STRING(100),
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
    agama: {
      type: DataTypes.STRING,
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
    alamat_siswa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_siswa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    no_telp_siswa: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    tgl_diterima: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    semester_diterima: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    diterima_di_kelas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sekolah_asal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_sekolah_asal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thn_ijazah_smp: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    no_ijazah_smp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thn_skhun_smp: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    no_skhun_smp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nama_ayah: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nama_ibu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alamat_ortu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    no_telp_ortu: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email_ortu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nama_wali: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alamat_wali: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    no_telp_wali: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    pekerjaan_wali: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tgl_meninggalkan_sekolah: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    alasan_meninggalkan_sekolah: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    no_ijazah_smk: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tgl_ijazah_smk: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    keterangan_lain: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    foto: {
      type: DataTypes.STRING,
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
    golongan_darah: {
      type: DataTypes.STRING,
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