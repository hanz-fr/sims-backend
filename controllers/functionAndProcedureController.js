const Sequelize = require('sequelize');
const { execute } = require('@getvim/execute');
const cron = require('node-cron');

var cp = require('child_process');

exports.backupDB = async (req, res) => {
  
  console.log(req);

  let db = req.query.db;
  let table = req.query.table || 'all';

  switch (db) {
    case 'frontend':
      db = 'sims_backend_1.0';
      break;
    case 'backend':
      db = 'sims_auth';
      break; 
    default:
  }

  if (table == "all") {

    // dump the result straight to a file
    mysqldump({
      connection: {
          host: 'localhost',
          user: 'root',
          password: '',
          database: db,
      },
      dumpToFile: `C:/SQL Backup/HistoryTableBackupTest.sql`,
    });

  } else {

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
      dumpToFile: `C:/SQL Backup/HistoryTableBackupTest.sql`,
    });
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