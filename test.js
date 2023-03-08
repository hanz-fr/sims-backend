const mysqldump = require('mysqldump');
// or const mysqldump = require('mysqldump')
 
// dump the result straight to a file
mysqldump({
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sims_backend_1.0',
    },
    dump: {
        tables: [
            "history",
        ],
    },
    dumpToFile: `C:/SQL Backup/HistoryTableBackupTest.sql`,
});