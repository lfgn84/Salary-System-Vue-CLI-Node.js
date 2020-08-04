var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "potWatch.db";


let potWatchdb = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err
    } else {
        console.log('Connected to the "potWatch" SQlite database.');
        potWatchdb.run(`CREATE TABLE potWatch (
            potWatchId INTEGER PRIMARY KEY,
            potWatchUserId INTEGER,
            potWatchDate DATE,
            potWatchType TEXT,
            potWatchAmount INTEGER,
            potWatchOldPot INTEGER,
            potWatchNewPot INTEGER
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                var insert = `INSERT INTO potWatch (
                potWatchUserId,
                potWatchDate,
                potWatchType,
                potWatchAmount,
                potWatchOldPot,
                potWatchNewPot 
                ) VALUES (?,?,?,?,?,?)`;
                potWatchdb.run(insert, [ 0, "2020-03-26", "input",  2485.6, 0, 2485.6]);
            }
        })
    }
});

module.exports = potWatchdb;