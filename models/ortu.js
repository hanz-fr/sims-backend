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
      Ortu.hasOne(models.Siswa, {
        foreignKey: 'OrtuId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',                                                                          
      });
    }
  }
  Ortu.init({
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
      allowNull: false,
    },
    pekerjaan: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Ortu',
    tableName: 'ortu'
  });
  return Ortu;
};