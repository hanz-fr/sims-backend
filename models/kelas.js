'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kelas.hasMany(models.Siswa, {
        foreignKey: 'KelasId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE', 
      });
      Kelas.belongsTo(models.Jurusan);
    }
  }
  Kelas.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(50)
    },
    kelas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rombel: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    jurusan: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    JurusanId: {
      type: DataTypes.STRING(50),
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
    modelName: 'Kelas',
    tableName: 'kelas',
  });
  return Kelas;
};