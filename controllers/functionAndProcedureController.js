const Sequelize = require('sequelize');
const { execute } = require('@getvim/execute');
const cron = require('node-cron');

var cp = require('child_process');


// cron.schedule('* * * * * *', () => {
//   exec("ls -la", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
//   });
// });

// const command = spawn ('mysql', [`-h localhost -u root -p sims_backend_1.0 > C:/"SQL Backup"/BackendBackup.sql`]);

// command.stdin.write("\n");

// command.stdout.on('data', output => {
//   console.log("Output : ", output.toString());
// });

// try {

// } catch(err) {

//   return res.status(400).json({
//     message: 'Failed',
//     error: err
//   });

// }

exports.download = async (req, res) => {
  
  var child = cp.spawn('mysql', [`-h localhost -u root -p sims_backend_1.0 > C:/"SQL Backup"/BackendBackup.sql`],{ cwd: "C:/xampp/mysql/bin" }).on('error', function( err ) { throw err });
  
  child.stdout.on('data', function() {
    console.log(data);
    console.log("STDOUT: ", data.toString());
  });


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