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
      // define association here
    }
  }
  NilaiAkhir.init({
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