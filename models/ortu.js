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
        foreignKey: 'nis_siswa',
        targetKey: 'nis_siswa',
        as: 'siswa',
      }); 
    }
  }
  Ortu.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 
    },
    nis_siswa: {
      type: DataTypes.STRING(10),
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Siswa',
        key: 'nis_siswa',
      }
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
  }, {
    sequelize,
    modelName: 'Ortu',
    tableName: 'ortu'
  });
  return Ortu;
};