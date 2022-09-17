'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MapelJurusan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MapelJurusan.hasOne(models.NilaiMapel, {
        foreignKey: 'idMapelJurusan',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  MapelJurusan.init({
    mapelJurusanId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    MapelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Mapel',
        key: 'id',
      },
    },
    JurusanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Jurusan',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'MapelJurusan',
    tableName: 'mapel_jurusan'
  });
  return MapelJurusan;
};