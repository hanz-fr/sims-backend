'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ortu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ortu.belongsTo(models.Siswa, {
        foreignKey: 'ortuId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Ortu.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nik_ortu: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    hubungan: {
      type: DataTypes.ENUM('Ibu', 'Ayah', 'Wali'),
      allowNull: true,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_telp: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    pekerjaan: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Ortu',
    tableName: 'ortu'
  });
  return Ortu;
};