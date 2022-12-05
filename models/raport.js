'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Raport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Raport.belongsTo(models.Siswa, {
        as: "siswa",
        foreignKey: "nis_siswa",
        targetKey: "nis_siswa",
      });
      Raport.hasMany(models.NilaiMapel, {
        as: 'NilaiMapel',
        foreignKey: 'RaportId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Raport.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    nis_siswa: {
      type: DataTypes.STRING(10),
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Siswa',
        key: 'nis_siswa'
      }
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thn_ajaran: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sakit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ijin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    alpa: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isNaik: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    naikKelas: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    tinggal_di_Kelas: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    alasan_tidak_naik: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tgl_kenaikan: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Raport',
    tableName: 'raport'
  });
  return Raport;
};