'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mutasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mutasi.belongsTo(models.Siswa, {
        foreignKey: 'nis_siswa',
        targetKey: 'nis_siswa',
      });
    }
  }
  Mutasi.init({
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
    alasan_mutasi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pindah_dari: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pindah_ke: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tgl_mutasi: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    sk_mutasi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Mutasi',
    tableName: 'mutasi'
  });
  return Mutasi;
};