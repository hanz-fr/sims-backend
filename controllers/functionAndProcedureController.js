const { json } = require("body-parser");
const Validator = require("fastest-validator");
const { History } = require("../models");
const { Op } = require("sequelize");
const models = require('../models');
var mysql = require('mysql');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');

// import fastest-validator
const v = new Validator();

const sequelize = new Sequelize('sims_backend_1.0', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: false
});

exports.getLamaSiswaSekolahFunction = async (req, res) => {

    let nis_siswa = req.query.nis_siswa;

    let query = `select lama_siswa_sekolah(tgl_diterima) as 'lama_siswa_sekolah' from siswa where nis_siswa='${nis_siswa}'`;

    try {

      const [results, metadata] = await sequelize.query(
        query
      );
      res.status(200).json(results);

    } catch (error) {

      res.status(404).json({
        status: 'error',
        message: error.message,
      });
      
    }

    
}