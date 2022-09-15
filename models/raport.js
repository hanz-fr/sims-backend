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
      Raport.hasOne(models.NilaiAkhir, {
        foreignKey: 'RaportId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Raport.belongsTo(models.Siswa, {
        foreignKey: "nis_siswa",
        targetKey: "nis"
      });
    }
  }
  Raport.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    // BUAT DI NILAI MAPEL
    /* mapelJurusanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'MapelJurusan',
        key: 'mapelJurusanId',
      },
    }, */
    nis_siswa: {
      type: DataTypes.STRING(10),
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Siswa',
        key: 'nis'
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
      allowNull: false,
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