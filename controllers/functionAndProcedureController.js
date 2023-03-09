const Sequelize = require('sequelize');
const { execute } = require('@getvim/execute');
const cron = require('node-cron');
var mysqldump = require('mysqldump');

var cp = require('child_process');

exports.backupDB = async (req, res) => {
  
  console.log(req.query);

  // today's date in case there is no filename
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var hh = today.getHours();
  today = dd+'-'+mm+'-'+yyyy+'_'+hh;

  let db = req.query.db;
  let table = req.query.table || 'all';
  let filename = req.query.fn || `${today}_backup.sql`;
  let path = req.query.path || `%USERPROFILE%/Downloads`;

  switch (db) {
    case 'backend':
      db = 'sims_backend_1.0';
      break;
    case 'frontend':
      db = 'sims';
      break; 
    default:
  }

  if (table == "all") {

    try {

      // dump the result straight to a file
      mysqldump({
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: db,
        },
        dumpToFile: `${path}/${filename}`,
      });

      res.status(200).json({
        status: 'success',
        message: 'Database successfully backed up.'
      });

    } catch (err) {

      res.status(400).json({
        status: 'error',
        message: err
      });

    }


  } else {

    try {

      // dump the result straight to a file
      mysqldump({
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: db,
        },
        dump: {
          tables: [
              table
          ],
        },
        dumpToFile: `${path}/${filename}`,
      });

      res.status(200).json({
        status: 'success',
        message: 'Database successfully backed up.'
      })

    } catch (err) {

      res.status(400).json({
        status: 'error',
        message: err
      });

    }
  }

  


}


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
      res.status(200).json({
        status: 'success',
        results
      });

    } catch (error) {

      res.status(404).json({
        status: 'error',
        message: error.message,
      });

    }

    
}