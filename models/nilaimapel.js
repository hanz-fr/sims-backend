'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NilaiMapel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NilaiMapel.belongsTo(models.Raport, {
        foreignKey: 'RaportId',
        targetKey: 'id',
      });
      NilaiMapel.belongsTo(models.MapelJurusan, {
        foreignKey: 'idMapelJurusan',
        targetKey: 'mapelJurusanId'
      });
    }
  }
  NilaiMapel.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    idMapelJurusan: {
      type: DataTypes.STRING(50),
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'mapel_jurusan',
        key: 'mapelJurusanId',
      },
    },
    RaportId: {
      type: DataTypes.STRING,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Raport',
        key: 'id',
      }
    },
    nilai_keterampilan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nilai_pengetahuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kkm: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nilai_us_teori: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nilai_us_praktek: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nilai_ukk_teori: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    nilai_ukk_praktek: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    nilai_akm: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'NilaiMapel',
    tableName: 'nilai_mapel',
  });
  return NilaiMapel;
};