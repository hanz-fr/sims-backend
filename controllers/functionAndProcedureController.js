const Sequelize = require('sequelize');
const { execute } = require('@getvim/execute');
const cron = require('node-cron');


/* function test () {

  execute('echo Bambang').then(console.log).catch(
    err=>{
      console.log("error", err)
    }
  );

}

cron.schedule('* * * * * *', () => {
  test();
}); */

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