var cp = require('child_process');


// mysqldump -h localhost -u root -p
// `mysqldump -h localhost -u root -p sims_backend_1.0 > C:/"SQL Backup"/BackendBackup2.sql`;

var child = cp.spawn(
    `mysql -u root -p`,
    {
        shell: true,
    },
    {
        cwd: "C:/xampp/mysql/bin"
    }
);


child.stdout.on('data', function (data) {
    // when prompted in the terminal, need to input something automatically from here...
    console.log(data.toString());
    process.stdout.write('\n');
});



child.on('close', (code) => {
    console.log(`Child process exited with code ${code}.`);
});


