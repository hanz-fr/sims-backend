'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mapel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mapel.belongsToMany(models.Jurusan, { 
        through: models.MapelJurusan,
        foreignKey: 'MapelId',
        targetKey: 'id',
      });
    }
  }
  Mapel.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(50)
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Mapel',
    tableName: 'mapel'
  });
  return Mapel;
};