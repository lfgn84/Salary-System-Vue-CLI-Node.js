var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "lockedWeeks.db"


let lockedWeeksdb = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the "lockedWeeks" SQlite database.')
        lockedWeeksdb.run(`CREATE TABLE lockedWeeks (
            lockedWeeksId INTEGER PRIMARY KEY,
            lockedWeeksUserId INTEGER,
            lockedWeeksStartDate DATE,
            lockedWeeksEndDate DATE
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                var insert = `INSERT INTO lockedWeeks (
                lockedWeeksId,
                lockedWeeksUserId,
                lockedWeeksStartDate,
                lockedWeeksEndDate
                
                ) VALUES (?,?,?,?)`
                lockedWeeksdb.run(insert, [0, 0, '2020-06-07', '2020-06-12'])
            }
        })
    }
})


module.exports = lockedWeeksdb