'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jurusan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Jurusan.hasMany(models.Kelas, {
        foreignKey: 'JurusanId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Jurusan.belongsToMany(models.Mapel, { 
        through: models.MapelJurusan,
        foreignKey: 'JurusanId',
        targetKey: 'id', 
      });
    }
  }
  Jurusan.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    konsentrasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Jurusan',
    tableName: 'jurusan'
  });
  return Jurusan;
};