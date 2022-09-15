'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NilaiAkhir extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NilaiAkhir.belongsTo(models.Raport);
    }
  }
  NilaiAkhir.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    RaportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Raport',
        key: 'id',
      } 
    },
    nilai_us_teori: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nilai_us_praktek: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nilai_ukk: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    nilai_akm: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'NilaiAkhir',
    tableName: 'nilai_akhir'
  });
  return NilaiAkhir;
};